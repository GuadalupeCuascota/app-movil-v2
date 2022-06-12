import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { Rol } from 'src/app/Models/roles';
import { Carreras } from 'src/app/Models/carreras-fica';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { RegistroCarrerasService } from 'src/app/Services/registro-carreras.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { LoadingService } from 'src/app/Services/loading.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
RegistroCarrerasService;

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  carreras: Carreras[] = [];
  roles: Rol [] = [];
  usuario: Usuario;
  estado: boolean;
  showPassword = false;
  passwordIcon = 'eye';
  isLoaded = false;
  formUsuario: FormGroup;
  formnivel: FormGroup;
  private emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private usuarioService: UsuarioService,
    private actRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private mensajeServices: MensajesService,
    private loadinServices: LoadingService,
    private registroCarreraService: RegistroCarrerasService,
    public alertController: AlertController,
    private so: ScreenOrientation,

  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.ObtenerRoles();
    this.getCarreras();

    this.formUsuario = this.formBuilder.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z a-zA-ZñÑáéíóúÁÉÍÓÚ]+'),
      ]),
      id_rol: new FormControl('', Validators.required),
      correo_electronico: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      contrasenia: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),

      nombre_carrera: new FormControl('', Validators.required),
      unidad_educativa: new FormControl('', Validators.required),
      termsAccepted: ['', Validators.required],
    });

    this.usuario = new Usuario();
  }
  toggleShow(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordIcon == 'eye') {
      this.passwordIcon = 'eye-off';
    } else {
      this.passwordIcon = 'eye';
    }
  }


  onTermsChecked(event) {
    console.log(event);

    if (event.detail.checked == true) {
      this.formUsuario.patchValue({ termsAccepted: true });
    } else {
      this.formUsuario.patchValue({ termsAccepted: null });
    }
  }
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (res) => {
        this.usuarios = res;

      },
      (err) => console.log(err)
    );
  }
  public optionsFn(event) {


    this.usuario.unidad_educativa=null
    this.formUsuario.controls['unidad_educativa'].setValue(this.usuario.unidad_educativa);
    this.usuario.nombre_carrera=null;
    this.formUsuario.controls['nombre_carrera'].setValue(this.usuario.nombre_carrera);
    //here item is an object

    if (event.target.value == 4) {
      this.estado = true;
      this.formUsuario.patchValue({nombre_carrera: true });
    } else {
      if(event.target.value == 5){
        this.estado = false;
        this.formUsuario.patchValue({unidad_educativa: true });
      }

    }
  }
  getCarreras() {
    var auxper = [];
    this.registroCarreraService.getCarreras().subscribe(
      (res) => {

        for (let aux of res) {
          if (aux.id_carrera != 1 && aux.id_carrera!=12) {
            auxper.push(aux);
          }
        }
        this.carreras = auxper;
        this.isLoaded = true;
      },
      (err) => {

      }
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Términos y condiciones',
      // subHeader: 'Una vez confirmada la solicitud solo podra cancelar hasta antes de 24 horas de la hora seleccionada ',
      message:
        'La Universidad Técnica del Norte en cumplimiento con la ley, garantiza que lo datos que usted entregue en el presente formulario serán de uso exclusivo de nuestra entidad con fines academicos. Debe saber que sus contestaciones son totalmente privadas.',
      buttons: [

        {
          text: 'OK',
          role: 'confirmar',
          handler: () => {
            console.log('Confirmar');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  async saveUsuarios() {
    const loading = await this.loadinServices.presentLoading('Cargando...');
    await loading.present();

    this.usuario.nombre = this.formUsuario.controls['nombre'].value;
    this.usuario.apellido = this.formUsuario.controls['apellido'].value;
    this.usuario.correo_electronico =
      this.formUsuario.controls['correo_electronico'].value;
    this.usuario.contrasenia = this.formUsuario.controls['contrasenia'].value;
    this.usuario.unidad_educativa=
      this.formUsuario.controls['unidad_educativa'].value;
    this.usuario.nombre_carrera = this.formUsuario.controls['nombre_carrera'].value;
    this.usuario.id_rol =
      this.formUsuario.controls['id_rol'].value;
    this.usuarioService.saveUsuario(this.usuario).subscribe(
      (res) => {
        loading.dismiss();
        if (res) {
          this.mensajeServices.presentToast('Usuario registrado');

          this.navController.back();
        }
      },
      (err) => {
        loading.dismiss();
        this.mensajeServices.presentAlert('Error', err.error.text)
      }
    );
  }
  ObtenerRoles() {
    var rol = [];
    this.usuarioService.getRoles().subscribe(
      (res: any) => {
        for (let rol1 of res) {
          if (rol1.id_rol == 4 || rol1.id_rol == 5) {
            rol.push(rol1);
          }
        }
        this.roles  = rol;
      },
      (err) => console.error(err)
    );
  }
}
