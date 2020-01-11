import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController,Loading } from 'ionic-angular';

/*
  Generated class for the HandleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HandleProvider {

  loader:Loading;

  constructor(private toastCtrl:ToastController, private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    console.log('Hello HandleProvider Provider');
  }

  basicAlert(msg)
  {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  basicToast(msg)
  {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

  showLoading(msg)
  {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  hideLoading()
  {
    this.loader.dismiss();
  }

}
