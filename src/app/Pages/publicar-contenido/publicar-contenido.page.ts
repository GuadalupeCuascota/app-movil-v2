import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { Publicacion } from 'src/app/Models/publicacion';

import { RegistroPublicacionService } from '../../Services/registro-publicacion.service';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import {ImagePicker,ImagePickerOptions} from '@ionic-native/image-picker/ngx';
///COMPLEMENTOS FILE//
import { File } from '@ionic-native/file/ngx';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-publicar-contenido',
  templateUrl: './publicar-contenido.page.html',
  styleUrls: ['./publicar-contenido.page.scss'],
})
export class PublicarContenidoPage implements OnInit {

  respData: any;
  imgRes: any;
 formGroup: FormGroup;
  publicacion: Publicacion;
  archivo: File;

  id_carrera = 'sin asignar';
  id_tipo_publicacion = '2';
  id_estado_publicacion = '2';
  datos: any = {};
  fileUrl: any = null;
  fileTransfer: FileTransferObject = this.transfer.create();

uploadText:any;
donwloadText:any;
url: string;
imageURI:any;

  constructor(
    private formBuilder: FormBuilder,
    public imagPicker: ImagePicker,
    public file: File,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private regitroPublicacion: RegistroPublicacionService,
    private photoLibrary: PhotoLibrary,
    private camera: Camera,

    public loadingCtrl: LoadingController,
    private so: ScreenOrientation,


  ) {
    this.uploadText="";
    this.donwloadText="";

  }

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.datos = JSON.parse(localStorage.getItem('payload'));
    this.formGroup = this.formBuilder.group({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });
  }


  open() {
    let filter = { mime: 'image/png , video/mp4' };
    this.fileChooser.open(filter).then((uri) => {
      this.filePath.resolveNativePath(uri).then((nativepath)=>{

        this.url = nativepath;


      this.upload();
      },(err)=>{
        alert(JSON.stringify(err))
      })



      })

      .catch((e) => console.log(e));
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      this.url = imageData;
      this.upload()
    }, (err) => {


    });
  }
  getFormData(){
    this.fileChooser.open().then((uri)=>{

      this.file.resolveLocalFilesystemUrl(uri).then((nativepath)=>{






  },(err)=>{
    alert(JSON.stringify(err))
  })
  this.imgRes = {};
  this.filePath.resolveNativePath(uri).then((nativepath)=>{
  this.url=nativepath

    this.upload()

  },(err)=>{
    alert(JSON.stringify(err))
  })
  },
  (err)=>{
  alert(JSON.stringify(err))
  }
  )
  }

  upload() {

    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}

    }

    this.fileTransfer.upload(this.url, 'http://192.168.100.45:3000/uploads/', options)
     .then((data) => {

      this.respData = JSON.parse(data.response);

      this.fileUrl = this.respData.fileUrl;
       // success
     }, (err) => {

     })
  }

  savePublicacion() {

    try {
      const fd = new FormData();
      fd.append('titulo', this.formGroup.controls['titulo'].value);
      fd.append('descripcion', this.formGroup.controls['descripcion'].value);
      fd.append('ruta_archivo', this.url);
      fd.append('id_carrera', this.id_carrera);
      fd.append('id_usuario', this.datos.id_usuario);
      fd.append('id_tipo_publicacion', this.id_tipo_publicacion);
      fd.append('id_estado_publicacion', this.id_estado_publicacion);

      this.regitroPublicacion.savePublicacion(fd).subscribe(
        (res) => {

        },
        (err) => {

        }
      );
    } catch {

    }
  }



}

