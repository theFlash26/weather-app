import { Component } from '@angular/core';
import { NavController,ModalController,App, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HandleProvider } from '../../providers/handle/handle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  _user:any;
  data:any = {};
  current:any;
  list:any = [];
  apikey:string = '4e5ebec61ceb176eb4f2821ed3247ecf';
  tgl:Date;

  constructor(public navCtrl: NavController,private modalCtrl: ModalController,private app:App,private api:ApiProvider,
    private handle:HandleProvider,private navParam:NavParams
  ) {
    
    this._user = navParam.get('user');
    console.log(this._user);

    api.get2('weather?q='+this._user.kota+',id&appid='+this.apikey)
    .subscribe(res => {
      let resp:any = res;
  
      this.current = resp;

      this.current.main.temp = this.current.main.temp / 14;

      this.tgl = new Date();
      let waktu = this.tgl.getHours();
      console.log(waktu);
      if(waktu >= 0 && waktu < 10)
      {
        this.handle.basicToast('Selamat Pagi '+this._user.nama);
        this.data.headerImage = "assets/imgs/bg-wheather.jpg";
      } else if(waktu >= 10 && waktu < 13)
      {
        this.handle.basicToast('Selamat Siang '+this._user.nama);
        this.data.headerImage = "assets/imgs/bg-wheather.jpg";
      } else if(waktu >= 13 && waktu < 18)
      {
        this.handle.basicToast('Selamat Sore '+this._user.nama);
        this.data.headerImage = "assets/imgs/bg-sore.png";
      } else {
        this.handle.basicToast('Selamat Malam '+this._user.nama);
        this.data.headerImage = "assets/imgs/bg-cuaca.png";
      }
      

    },(err)=>{
      console.log(err);
    });

    api.get2('forecast/daily?q='+this._user.kota+',id&cnt=5&mode=json&appid='+this.apikey)
    .subscribe(res => {
      let resp:any = res;
      
      var items:any = resp.list;

      for(var i=0;i<items.length;i++)
      {
        let waktu = new Date(1578715200);

        console.log('waktu',waktu);

        let item = {
          tanggal: waktu.toString(),
          cuaca: items[i].weather[0].main,
          temp: items[i].temp.day,
          icon: items[i].weather[0].icon
        }

        this.list.push(item);
      }

      console.log(this.list);
    },(err)=>{
      console.log(err);
    });

  }


}
