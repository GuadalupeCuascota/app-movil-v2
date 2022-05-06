import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; //importar módulo de http para realizar peticiones
import { Storage } from '@ionic/storage';
// import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuPrincipalPageModule } from './Pages/Estudiante-secundaria/menu-principal/menu-principal.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


///complementos file///
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import {
  StreamingMedia

} from '@ionic-native/streaming-media/ngx';
import { PipesModule } from './pipes/pipes.module';
//  import { YoutubePipe } from './pipes/youtube.pipe';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [

    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MenuPrincipalPageModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    PipesModule,

  ],
  providers: [ ImagePicker,File,Camera,InAppBrowser,AppAvailability,
    FileTransfer,FileChooser, FilePath,PhotoLibrary,SocialSharing, ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
    IonicStorageModule,
    StreamingMedia,YoutubeVideoPlayer,EmailComposer,
  ],
  exports: [MenuPrincipalPageModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
