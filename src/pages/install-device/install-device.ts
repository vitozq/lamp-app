import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';


/**
 * Generated class for the InstallDevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-install-device',
  templateUrl: 'install-device.html',
})
export class InstallDevicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstallDevicePage');
  }
  ionViewLoaded(){
    let toast = this.toastCtrl.create({
              message: '登录失败。请检查账号信息然后重试。',
              duration: 3000,//显示时间
              position: 'top'//弹出方向
            });
            toast.present();
  }
  //   let seq = this.api.post('login', this.account);
  //   seq.subscribe((res: any) => {
  //     if(res.success == false || res.status == "error") {
  //       //弹出提示消息
  //       let toast = this.toastCtrl.create({
  //         message: '登录失败。请检查账号信息然后重试。',
  //         duration: 3000,//显示时间
  //         position: 'top'//弹出方向
  //       });
  //       toast.present();
  //     }else {
  //       this.navCtrl.push(MainPage);//登录成功页面跳转
  //       //存储登录token.....
  //       localStorage.setItem('app_token', res.access_token);
  //       console.log(localStorage.getItem('app_token'),"app_token");
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });
  // }
}
