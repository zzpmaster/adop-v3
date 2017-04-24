import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ResourceService } from './resource-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class Auth {

  constructor(public http: Http, public resourceService: ResourceService, 
              public storage: Storage, public events: Events) {
    console.log('Hello Auth Provider');
  }

  login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.storage.get('token').then(data => {
          if (data) {
            resolve(true);
          } else {
            resolve(false);
          } 
        });
      }, 2000);
    });
  }

  deleteToken():void {
    this.storage.remove('token');
  }

  saveToken(value: string): void {
    this.storage.set('token', value);
  }

  localLogin() {
    this.resourceService.loginAuthentication({}).subscribe((res: Response) => {
      let token = res.json().login.token;
      this.saveToken(token);
      this.events.publish('user:login');
    });
  }

  logout(): void {
    this.deleteToken();
    this.events.publish('user:logout');
  }

}
