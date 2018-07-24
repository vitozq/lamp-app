import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };
  
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {
  }

  /**
   * 注册
   */
  doSignup() {
    this.navCtrl.push(MainPage);
  }
}
