import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams,Headers } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  url: string;
  url2:string;
  url3:string;
  onDevice: boolean;
  private _DB : any;
  private success: boolean = true;

  constructor(public http: Http,public http2:HttpClient,public platform:Platform) {
    console.log('Hello ApiProvider Provider');
    this.onDevice = this.platform.is('cordova');
    if(this.onDevice) {
      this.url = 'http://aos.cianjurkab.go.id/api/api';
      this.url2 = 'http://api.openweathermap.org/data/2.5';
    } else {
      this.url = 'http://localhost/web-aos/api';
      this.url2 = 'http://api.openweathermap.org/data/2.5';
    }
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http2.get(this.url + '/' + endpoint);
  }

  get2(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http2.get(this.url2 + '/' + endpoint);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http2.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body);
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body);
  }

}
