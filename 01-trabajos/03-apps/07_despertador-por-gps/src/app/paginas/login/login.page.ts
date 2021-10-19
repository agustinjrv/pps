import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//import Swal from 'sweetalert2';
import { Usuario } from '../../clases/Usuario/usuario';
import { AuthService } from '../../servicios/auth/auth.service';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import {take} from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public unUsuario: any = {};
  public userValid: boolean = true;
  notfound: number = 0;
  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServicie: AuthService,
    private servicioUsuario: UsuarioService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController

  ) {
    //this.unUsuario = new Usuario();


  }
  ngOnInit(): void {
    this.initForm();
  }
  async onLogin() {
    this.unUsuario = new Usuario();
    this.unUsuario.correo = this.userForm.value.email;
    this.unUsuario.clave = this.userForm.value.password;

    let loading = this.presentLoading()

    this.authServicie.Login(this.unUsuario.correo, this.unUsuario.clave).then((response:any) => {

      this.servicioUsuario.TraerUno(this.unUsuario.correo).valueChanges().pipe(take(1)).subscribe((data)=> {

        let datosUsuario: any = data[0];
        let usuarioLogin: any = {};
        console.log('hola mundo');
        usuarioLogin.correo = this.unUsuario.correo;
        usuarioLogin.clave = this.unUsuario.clave;

        localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioLogin));        
        this.router.navigateByUrl('/home');
        
      });
    }).catch(async () => {
      (await loading).onDidDismiss().then(() => {
        this.presentAlert('Usuario y/o contraseña incorrecta');///
      })
    });

  }


  public Login(_correo, _password) {
    this.userForm.setValue({ email: _correo, password: _password });
  }

  irRegistro() {
    this.router.navigateByUrl("registro");
  }



  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Espere un momento',
      duration: 2000
    });
    await loading.present();

    return loading;
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();


  }

  async Toast(color: string, mensaje: string, duration: number = 2000) {
		const toast = await this.toastController.create({
			message: mensaje,
			duration: duration,
			color: color,
			position: 'top'

		});
		toast.present();
	}

}
