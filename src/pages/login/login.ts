import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { App,IonicPage, NavController, ToastController } from 'ionic-angular';
import { MainPage } from '../';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  //默认登录信息
  account: { username: string, password: string } = {
    username: '13077395475',
    password: '123456'
  };

  constructor(public navCtrl: NavController,
    public api: Api,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
              private app:App ) {
  }

  /**
   * 登录
   */
  doLogin() {
    // this.navCtrl.push(MainPage);//登录成功页面跳转



    let seq = this.api.post('login', this.account);
    seq.subscribe((res: any) => {
      if(res.success == false || res.status == "error") {
        //弹出提示消息
        let toast = this.toastCtrl.create({
          message: '登录失败。请检查账号信息然后重试。',
          duration: 3000,//显示时间
          position: 'top'//弹出方向
        });
        toast.present();
      }else {
        this.app.getRootNav().setRoot(MainPage);
        this.navCtrl.push(MainPage);//登录成功页面跳转
        //存储登录token.....
        localStorage.setItem("username",this.account.username);
        localStorage.setItem('app_token', res.token);
        console.log(localStorage.getItem('app_token'),"app_token");
      }
    }, err => {
      console.error('ERROR', err);
    });


  }
}
