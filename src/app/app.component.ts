import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { Contents } from '../pages/contents/contents';
import { LoginPage } from '../pages/login/login';
import { Auth } from '../providers/auth';

import { LoadingController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  loader: any;

  pages: Array<{title: string, component: any, isFunc: Boolean}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              public auth: Auth,
              public loadingController: LoadingController,
              public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.presentLoading();

    this.listenToLoginEvents();

    this.auth.login().then((isLogin) => {
      if (isLogin) {
        this.rootPage = Contents;
      } else {
        this.rootPage = LoginPage;
      }
      this.loader.dismiss();
    });

    this.pages = [
      { title: 'Contents', component: Contents, isFunc: false },
      { title: 'Home', component: HomePage, isFunc: false },
      { title: 'Logout', component: 'logout', isFunc: true }
    ];
    
  }

  presentLoading() {
    this.loader = this.loadingController.create({
      content: "Authenticating.."
    });
    this.loader.present();
  }

  openPage(page) {
    if (!page.isFunc) {
      this.nav.setRoot(page.component);
    } else {
      this.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.nav.setRoot(Contents);
    });

    this.events.subscribe('user:logout', () => {
      this.nav.setRoot(LoginPage);
    });
  }

  logout() {
    this.auth.logout();
  }

}

