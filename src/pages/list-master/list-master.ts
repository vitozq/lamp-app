import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController,ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Api} from "../../providers";
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
  newFault:any;
  hasDoneFault:any;
  //tab页面状态
  status:String = 'new';

  //当前位置信息
  currentPosition :any ={
    latitude:0,//维度
    longitude:0//经度
  };

  url:any;

  constructor(public navCtrl: NavController,
              public items: Items,
              public modalCtrl: ModalController,
              private geolocation: Geolocation,
              private api:Api,
              private toastCtrl :ToastController) {
    this.currentItems = this.items.query();
    this.url = config.ENV.baseUrl;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }
  ionViewDidEnter(){
    //   this.getCurrentFault(1);
    // this.newFault=this.currentItems;
    // this.getCurrentFault(0);
    // this.hasDoneFault=this.currentItems;
    // console.log(this.newFault);
  }

  /**
   * 切换tab页面
   */
  changeTab(status){
    this.status = status;
    //清空列表数据，重新根据状态加载数据
    if(status=='new'){
      this.currentItems=this.newFault;
    }else{
      this.currentItems=this.hasDoneFault;
    }
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

  getCurrentFault(currentStatus) {
    let seq = this.api.post("getAllFault", {
        username:localStorage.getItem("username"),
      currentStatus:currentStatus
      }
    );
    seq.subscribe( (res: any) =>{
      this.currentItems=res;
      console.log(this.currentItems.length);
    },err =>{
      console.error('ERROR',err);
    });

  }



  // test(){
	// 	 this.navCtrl.push("InstallDevicePage",{barcodeData:1});
	// }

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


  prompt(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,//显示时间
      position: 'top'//弹出方向
    });
    toast.present();
  }

}
