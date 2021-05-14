import { Component, OnInit } from '@angular/core';

//Validaciones y Alerts
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

///Login
import { User } from '../shared/User.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users =[
    {"email":"admin@admin.com","clave":"111111"},
    {"email":"invitado@invitado.com","clave":"222222"},
    {"email":"usuario@usuario.com","clave":"333333"},
    {"email":"anonimo@anonimo.com","clave":"444444"},
    {"email":"tester@tester.com","clave":"555555"}
  ];


  constructor(
    private router: Router,
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  user: User = new User();

  /***  VALIDACIONES ***/
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Ingrese un correo' },      
    ],
    password: [
      { type: 'required', message: 'Ingrese una Contraseña' },
    ]
  }

  registrationForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
      ]
    ],
    password: ['', Validators.required]
  });

  async onLogin() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      this.authSvc.currentUser = this.user;
      console.log("Logeado!!");
      this.router.navigateByUrl('/home');
    }
  }

  public submit() {
    console.log(this.registrationForm.value);
  }
    ngOnInit(){}

  public LoginFast(id:number){
    this.user.email = this.users[id].email;
    this.user.password = this.users[id].clave;

  }
}
