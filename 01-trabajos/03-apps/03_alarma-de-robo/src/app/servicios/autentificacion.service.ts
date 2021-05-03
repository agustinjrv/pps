import { Usuario } from './../clases/usuario';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  currentUser: any;
  isLogged: any = false;

  constructor(
    public afAuth: AngularFireAuth,
    public alertController:AlertController
  ) { 
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onLogin(user: Usuario) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      /*** ALERTS ***/
      const alert = await this.alertController.create({
        header: 'Alert Login',
        message: error,
        buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }
  }

  async onRegister(user: Usuario) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }
    catch (error) {
      /*** ALERTS ***/
      const alert = await this.alertController.create({
        header: 'Alert Register',
        message: error,
        buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }
  }
}
