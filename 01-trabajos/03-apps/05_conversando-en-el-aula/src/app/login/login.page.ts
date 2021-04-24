import { Usuario } from './../clases/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from '../servicios/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user:Usuario;
  public flag:boolean;


  constructor(private router:Router , private authSvc :AutentificacionService) 
  {
    this.user=new Usuario();
    this.flag=false;
  }

  ngOnInit(){}

  public async onLogin()
  {
    const user= await this.authSvc.onLogin(this.user);

    if(user)
    {
      alert("BIENVENIDOOOOO");
      this.router.navigateByUrl("/home");
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }


  }

}
