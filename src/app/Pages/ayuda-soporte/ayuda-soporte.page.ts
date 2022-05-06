import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-ayuda-soporte',
  templateUrl: './ayuda-soporte.page.html',
  styleUrls: ['./ayuda-soporte.page.scss'],
})
export class AyudaSoportePage implements OnInit {

  constructor(private socialSharing: SocialSharing,private emailComposer: EmailComposer,private so: ScreenOrientation,) { }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);

  }
  SendEmail(){
    this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
  }
  OpenEmailcomposer(){
    this.emailComposer.open({
      to:'wstem_ecuador@utn.edu.ec'
    })
  }
}
