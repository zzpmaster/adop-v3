import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import * as querystring from 'querystring';

@Injectable()
export class ResourceService {

  headers: Headers = new Headers();
  constructor(private http: Http) {
    this.headers.append('Content-type', 'applicaiton/json');
  }

  interceptor(): RequestOptions {
      const opts: RequestOptions = new RequestOptions();
      opts.headers = this.headers;
      return opts;
  }

  loginAuthentication(data: Object): Observable<any> {
    // return this.http.post(API_ROOT + '/auth', JSON.stringify(data), this.interceptor());
    return this.http.get('/assets/datas/data.json', this.interceptor());
  }

  queryContentsList(options: Object): Observable<any> {
    let params: RequestOptions = this.interceptor();
    // object to 'a=b&c=d'
    params.search = new URLSearchParams(querystring.stringify(options))
    return this.http.get('/assets/datas/data.json', params)
  }

}
