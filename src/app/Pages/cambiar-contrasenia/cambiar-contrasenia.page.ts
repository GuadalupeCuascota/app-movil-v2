import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/Models/usuario';
import { LoadingService } from 'src/app/Services/loading.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.page.html',
  styleUrls: ['./cambiar-contrasenia.page.scss'],
})
export class CambiarContraseniaPage implements OnInit {
  contraN: any = {
    contrasenia: '',
  };
  id = '';
  formGroup: FormGroup;
  contrasenia = '';
  contraseniaConf = '';
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private mensajeServices: MensajesService,
    private so: ScreenOrientation,

  ) {}

  ngOnInit() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    const params = this.actRoute.snapshot.params;
    this.id = params.id;

    this.formGroup = this.formBuilder.group({
      contrasenia: new FormControl('', Validators.required),
      contraseniaConf: new FormControl('', Validators.required),
    });
  }
  guardarCambios() {

    this.contraN.contrasenia = this.formGroup.controls['contrasenia'].value;
    this.contraseniaConf = this.formGroup.controls['contraseniaConf'].value;

    if (this.contraN.contrasenia == this.contraseniaConf) {

      this.usuarioService.RestablecerPass(this.id, this.contraN).subscribe(
        (res) => {
          this.mensajeServices.presentToast('contraseña restaurada');
          this.router.navigate(['/login']);
        },
        (err) => {

        }
      );
    } else {
      this.mensajeServices.presentAlert('Error',"Las contraseñas no coinciden")
    }
  }
}
