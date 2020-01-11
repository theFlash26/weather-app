import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var cordova:any;

@Injectable()
export class AuthProvider {

  public _user: any;

  constructor(public http: HttpClient,public storage:Storage,private api:ApiProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }



}
