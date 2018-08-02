import { Component } from '@angular/core';
import {AlertController , App,IonicPage, NavController, ToastController } from 'ionic-angular';
import {Api} from "../../providers";
import { LoginPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  oldPassword:any;
  newPassword:any;
  // account: { name: string, email: string, password: string } = {
  //   name: 'Test Human',
  //   email: 'test@example.com',
  //   password: 'test'
  // };

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
              private api:Api,
              private app:App,
              private alertCtrl:AlertController) {
  }

  /**
   * 修改密码
   */
  submit() {
   let seq= this.api.post("chgPass",{
      username:localStorage.getItem("username"),
      oldPassword:this.oldPassword,
      newPassword:this.newPassword
    });

    seq.subscribe((res: any) => {
      if(res.status == "error") {
        //弹出提示消息
        let toast = this.toastCtrl.create({
          message: res.msg,
          duration: 3000,//显示时间
          position: 'top'//弹出方向
        });
        toast.present();
      }else {
        this.showAlert("","密码修改成功!");
        this.app.getRootNav().setRoot(LoginPage);
        //清除登录Token
        localStorage.removeItem('app_token');
      }
    }, err => {
      console.error('ERROR', err);
    });

  }

  showAlert(title,content) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: ['确认']
    });
    alert.present();
  }

}
