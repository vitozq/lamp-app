import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import  * as config  from '../../config/config-env';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  //列表item
  currentItems: Item[];

  //二维码信息
  scanInfo : any;

  //当前位置信息
  currentPosition :any ={
    latitude:0,//维度
    longitude:0//经度
  };

  url:any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
              private barcodeScanner: BarcodeScanner,private geolocation: Geolocation) {
    this.currentItems = this.items.query();
    this.url = config.ENV.baseUrl;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }


	test(){
		 this.navCtrl.push("InstallDevicePage",{barcodeData:1});
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
      console.log('Barcode data', barcodeData);
      this.scanInfo = barcodeData;
      this.navCtrl.push("InstallDevicePage",{barcodeData:barcodeData});
    }).catch(err => {
      console.log('Error', err);
    });
  }

  /**
   * 获取当前位置
   */
  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.currentPosition.latitude=resp.coords.latitude;
      this.currentPosition.longitude=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}
