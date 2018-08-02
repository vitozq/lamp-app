import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {Api} from "../../providers";

/**
 * Generated class for the ItemInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-info',
  templateUrl: 'item-info.html',
})
export class ItemInfoPage {
    item:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api:Api,
              private alertCtrl:AlertController) {
    this.item=this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemInfoPage');
  }

  /**
   * 完成即消除故障
   */
  done(){
    const confirm = this.alertCtrl.create({
      title: "",
      message: "设备故障是否已经消除？",
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确定',
          handler: () => {
            let seq=  this.api.post("updateStatus",{frId:this.item.frId});
            seq.subscribe((res:any) =>{
                //成功解除故障后将button框失效
                this.item.currentStatus=0;
                this.isDone();
            },err=>{
              console.error('ERROR',err);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  isDone(){
    if(this.item.currentStatus==0){
     return  true;
   }else{
     return false;
   }
  }
}
