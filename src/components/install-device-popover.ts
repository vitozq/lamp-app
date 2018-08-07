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
        <ion-col>
          <img src="assets/imgs/popover/background@2x.png" class="img-background">
          <img *ngIf="status=='new'" src="assets/imgs/popover/success@2x.png" class="main-img">
          <img *ngIf="status=='old'" src="assets/imgs/popover/warn@2x.png" class="main-img">
          <img *ngIf="status=='replace'" src="assets/imgs/popover/newSuccess@2x.png" class="main-img">
          <div *ngIf="status=='new'">设备注册成功</div>
          <div *ngIf="status=='old'" style="color:#fdbe73">设备已被注册</div>
          <div *ngIf="status=='replace'" style="color:#3cb3c3">设备替换成功</div>
        </ion-col>
      </ion-row>
      <div class="device-info">
        <ion-row>
          <ion-col text-left darkgray>
            设备序列号
          </ion-col>
          <ion-col text-right darkgray>
            {{device.imeiCode}}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-left>
            设备激活状态
          </ion-col>
          <ion-col *ngIf="status=='new'" text-right>
            未激活
          </ion-col>
          <ion-col *ngIf="status=='old'" text-right>
            已激活
          </ion-col>
          <ion-col *ngIf="status=='replace'" text-right>
            未激活
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-left>
            灯杆编号
          </ion-col>
          <ion-col text-right>
            {{device.postNum}}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-left>
            经纬度
          </ion-col>
          <ion-col text-right>
            {{device.longitudeLatitude}}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col text-left>
            所属街道
          </ion-col>
          <ion-col text-right>
            {{device.street}}
          </ion-col>
        </ion-row>
      </div>
      <ion-row text-center>
        <ion-col>
          <button ion-button (click)="confirm()" class="primary device-btn">确认</button>
        </ion-col>
      </ion-row>
    </div>`,
  inputs: ['planId']
})
export class InstallDevicePopover {

  public device;
  public status;

  public outputValue = new EventEmitter();

  public project = {
    id: 3,
    name: '',
    content: ''
  }

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    this.device = navParams.get('device');
    this.status = navParams.get("status");
    //util.hideLoading();
  }

  //选择项目
  choseProject() {
  }

  closePopover() {
    this.viewCtrl.dismiss();
  }

  //添加项目
  confirm() {
    this.viewCtrl.dismiss(this.project);
  }
}


