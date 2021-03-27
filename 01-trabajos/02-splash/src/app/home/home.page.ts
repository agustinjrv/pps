import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import {User} from '../shared/User.class';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    user:User = new User();
    flag:boolean =false;


  constructor(private router:Router , private authSvc : AuthService) {}

  ngOnInit(){}

  async onLogin()
  {
    const user= await this.authSvc.onLogin(this.user);

    if(user)
    {
      
      console.log('Successfully logged in!!');
      alert("BIENVENIDOOOOO");
      this.router.navigateByUrl("/principal");
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }


  }

}
