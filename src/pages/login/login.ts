import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HandleProvider } from '../../providers/handle/handle';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string='';
  kodepos:string='';

  error:{ errorUsername:string,errorKodepos:string } = {
    errorUsername: '',
    errorKodepos: ''
  }

  private isUsernameValid: boolean = true;
  private isKodeposValid: boolean = true;

  private regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthProvider,private api:ApiProvider,
    private handle:HandleProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login()
  {
    if(!this.validate())
    {
      return;
    }

    this.handle.showLoading('Mohon tunggu...');

    this.api.get('get_kota?kodepos='+this.kodepos)
    .subscribe(res => {
      let resp:any = res;
      console.log(resp.data);
      this.handle.hideLoading();

      if(resp.data != null)
      {
        let user = {
          nama: this.username,
          kodepos: this.kodepos,
          kota: resp.data.kecamatan
        }
        this.navCtrl.setRoot(HomePage,{ user:user });
      } else {
        this.handle.basicToast('Kodepos yang dimasukan tidak terdaftar');
      }
    },(err)=>{
      this.handle.hideLoading();
      console.log(err);
    });

   // this.auth.saveLogin(user);
   

  }
 
  validate():boolean {
    this.isUsernameValid = true;
    this.isKodeposValid = true;

    if (!this.username ||this.username.length == 0) {
        this.isUsernameValid = false;
        this.error.errorUsername = 'Username tidak boleh kosong';
    } 
   
    if (!this.kodepos || this.kodepos.length == 0) {
        this.isKodeposValid = false;
        this.error.errorKodepos = 'Kode Pos tidak boleh kosong';
    } 
    
    return this.isKodeposValid && 
        this.isUsernameValid;
  }
}
