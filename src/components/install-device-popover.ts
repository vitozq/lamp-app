/**
 * Created by hurong on 2018/7/9.
 * 拜访计划详情-项目信息-填写完成情况弹框
 */
import {Component, EventEmitter} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'install-device-popover',
  template: `    
    <div>
      <ion-row class="device-title" text-center>
        <ion-col text-right style="flex: 0 0 40%;">
          <img  src="assets/imgs/popover/success@2x.png">
        </ion-col>
        <ion-col text-left style="align-self: center">
          设备注册成功
        </ion-col>
      </ion-row>
      <div class="device-info">
        <ion-row>
          <ion-col text-left darkgray>
            设备序列号
          </ion-col>
          <ion-col text-right darkgray>
            XXXXX
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-left>
            设备序列号
          </ion-col>
          <ion-col text-right>
            XXXXX
          </ion-col>
        </ion-row> <ion-row>
        <ion-col text-left>
          设备序列号
        </ion-col>
        <ion-col text-right>
          XXXXX
        </ion-col>
      </ion-row> <ion-row>
        <ion-col text-left>
          设备序列号
        </ion-col>
        <ion-col text-right>
          XXXXX
        </ion-col>
      </ion-row>
      </div>
      <ion-row text-center>
         <ion-col class="align-center" >
           <button  ion-button (click)="confirm()" class="primary device-btn">确认 </button>
        </ion-col>
      </ion-row>
  </div>`,
  inputs:['planId']
})
export class InstallDevicePopover {

  public planId;

  public outputValue = new EventEmitter();

  public project={
      id:3,
      name:'',
      content:''
  }

  constructor(public navCtrl:NavController ,public viewCtrl:ViewController,public navParams: NavParams) {
    this.planId = navParams.get('planId');
    console.log("planId"+this.planId);
    //util.hideLoading();
  }

  //选择项目
  choseProject(){
   /* this.navCtrl.push(SearchComponent,{
      title:"选择项目",
      search:"搜索项目名称/项目编码/负责人",
      showType:2
    });*/
  }

  closePopover(){
    this.viewCtrl.dismiss();
  }

  //添加项目
  confirm(){
    this.viewCtrl.dismiss(this.project);
  }
}


