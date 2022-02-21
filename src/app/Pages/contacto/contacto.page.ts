import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  datos: any = {};
  constructor(private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability,
  ) { }

  ngOnInit() {

    this.datos=JSON.parse(localStorage.getItem('payload'));
  }
  socialMedia(type) {
    switch (type) {
      case 'FACEBOOK': {
        this.openFacebook('FICA-STEM-542882706252025', 'https://www.facebook.com/FICA-STEM-542882706252025/');
        break;
      }
      case 'INSTAGRAM': {
        this.openInstagram('fica_stem')
        break;
      }
      case 'TWITTER': {
        this.openTwitter('StemFica');
        break;
      }
      case 'PAGE': {
        this.openPageWeb('https://wstemproject.eu/');
        break;
      }
    }
  }
  openFacebook(name, url) {
    let app;
    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      this.openInApp('https://www.facebook.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then(res => {

        console.log("EXISTE")
        const fbUrl = 'fb://facewebmodal/f?href=' + url;
        this.openInApp(fbUrl);
      }
      ).catch(() => {
        console.log("NO EXISTE")
        this.openInApp('https://www.facebook.com/' + name);
      });
  }
  openInApp(url) {
    this.inAppBrowser.create(url, '_system')
  }
  openInstagram(name) {
    let app;
    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      this.openInApp('https://www.instagram.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then((res) => {
        this.openInApp('instagram://user?username=' + name);
      }
      ).catch(err => {
        this.openInApp('https://www.instagram.com/' + name);
      });
  }
  openTwitter(name) {
    let app;
    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.twitter.android';
    } else {
      this.openInApp('https://twitter.com/' + name);
      return;
    }
    this.appAvailability.check(app)
      .then((res) => {
        const data = 'twitter://user?screen_name=' + name;
        this.openInApp(data);
      }
      ).catch(err => {
        this.openInApp('https://twitter.com/' + name);
});
  }
  openPageWeb(url) {
    let app;
    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      this.inAppBrowser.create(url,'_self')
    } else {
      this.openInApp('https://wstemproject.eu/');
      return;
    }

  }
}
