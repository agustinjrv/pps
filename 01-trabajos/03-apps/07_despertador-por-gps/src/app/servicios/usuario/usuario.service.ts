import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore/';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/Usuario/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public pathUsuarios = '/usuarios';
  public coleccionUsuarios: AngularFirestoreCollection<any>;
  public listaUsuarios;

  constructor(private bd: AngularFirestore,
              private servicioAuth: AuthService,
              private router:Router) {
              this.coleccionUsuarios = this.bd.collection(this.pathUsuarios);
  }

  public AgregarUno(usuario: any)
  {
    this.servicioAuth.Register(usuario.correo, usuario.clave).then((response) => {

      this.AgregarUsuario(usuario);

    });      

  }

  public TraerUno(correo)
  {
    return this.BuscarUsuarioCorreo(correo);
  }

  public BuscarUsuarioCorreo(correo) {
    return this.bd.collection(this.pathUsuarios, ref=>ref.where("correo", "==", correo ));    
  }

  public AgregarUsuario(usuario: any) {

    this.coleccionUsuarios.doc(usuario.id).set({ ...usuario });
    
  }

  public TraerTodos() {
    return this.coleccionUsuarios;
  }

  public BorrarUno(unUsuario:Usuario) {
    this.coleccionUsuarios.doc(unUsuario.id).delete();
  }

  public ModificarUno(unUsuario: Usuario) {
    this.coleccionUsuarios.doc(unUsuario.id).set({ ...unUsuario }).then(() => {

        console.log('Modificado');
    });
  }
}
