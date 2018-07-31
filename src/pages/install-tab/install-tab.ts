import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the InstallTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-install-tab',
  templateUrl: 'install-tab.html',
})

export class InstallTabPage {
  //二维码信息
  scanInfo : any;
  result:any;
  device:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcodeScanner:BarcodeScanner,
              private api:Api,
              public  toastCtrl :ToastController) {

    this.device=this.navParams.get("device");

  }

  ionViewDidLoad() {
    this.getStreetInfo();
    console.log('ionViewDidLoad InstallTabPage');
  }

  /**
   * 扫描二维码
   */
  scan(){
    let options = {
      preferFrontCamera: false,//前置摄像头
      showFlipCameraButton: true,//翻转摄像头按钮
      showTorchButton: true,//闪关灯按钮
      formats: 'QR_CODE',//格式
      prompt: '扫描中……',//提示文本(Android )
      orientation: 'portrait',//方向(Android)
      torchOn: false,//启动闪光灯(Android)
      resultDisplayDuration: 500,//扫描结果显示时间，默认为1500ms(Android)
      disableSuccessBeep: true //禁用扫描成功后哔哔声(iOS)
    };
    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scanInfo = barcodeData;
      this.forward(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  test1(){
    this.forward("a123");
  }
  forward(barcodeData){
    let seq =  this.api.post("getDeviceBySnCode",barcodeData);
    seq.subscribe((res: any) => {
      if(res!=null){
        // console.log(barcodeData+res.modelNum);
        this.navCtrl.push("InstallDevicePage",{barcodeData:barcodeData,modelNum:res.modelNum,street:this.result});
        /** 禁止重复安装注册**/
        // if(res.deviceId==null||res.deviceId==''){
        //   this.navCtrl.push("InstallDevicePage",{barcodeData:barcodeData,modelNum:res.modelNum,street:this.result});
        // }
        // else{
        //     this.prompt("该设备已经成功安装，请不要重复安装");
        // }
      }else{
        this.prompt('未在平台找到该设备,请联系项目管理员!');

      }
    },err =>{
      console.error('ERROR', err);
    });
  }


  /**
   * 获取项目所属街道信息
   */
  getStreetInfo(){
       let username= localStorage.getItem("username");
       let seq=this.api.post("getStreetInfo",username);
       seq.subscribe( (res: any) =>{
         // console.log("res"+res);
         this.result=res;
         // console.log("result"+this.result);
    },err =>{
        console.error('ERROR',err);
       });
  }

  prompt(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,//显示时间
      position: 'top'//弹出方向
    });
    toast.present();
  }
}
