import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public estaLogeado=false;

  constructor(public  firebaseAuth: AngularFireAuth, private router: Router) { }

  Login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.firebaseAuth.signInWithEmailAndPassword(email, password).then(response => {
        resolve(response);
      }, (error: any) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            rejected("El usuario no existe");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave incorrecta");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });

    });

    

  }

  
  Register(email: string, password: string) {
    
    return new Promise<any>((resolve, rejected) => {
      this.firebaseAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.EnviarMailDeVerificacion();
        resolve(response);
      }, (error: any) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            rejected("El correo ya se encuentra tomado");
            break;

          default:
            rejected("ERROR");
            break;
        }
      });
    });
  }

  signAnonimo()
  {

    return new Promise((resolve, rejected) => {
      this.firebaseAuth.signInAnonymously().then((response:any) => {
        
        resolve(response);
      }, (error: any) => {
        console.log(error);
        
      });

    });

  }

  async EnviarMailDeVerificacion(){
    return await (await this.firebaseAuth.currentUser).sendEmailVerification(); 
  }

  ObtenerUsuarioActual() {
    return this.firebaseAuth.currentUser;
  }

  LogOutCurrentUser() {
    this.firebaseAuth.signOut();
  }

}
