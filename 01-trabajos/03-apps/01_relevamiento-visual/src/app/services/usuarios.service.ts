import { Injectable } from '@angular/core';
import {AngularFireList,AngularFireDatabase} from '@angular/fire/database'
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private dbPath= '/usuarios';
  listaUsuarios:Usuario[];
  usuarioRef: AngularFireList<Usuario>=null;

  constructor(private db:AngularFireDatabase,private router:Router) { 
    this.usuarioRef= db.list(this.dbPath);
    this.usuarioRef.valueChanges().subscribe(usuarios=>{
      this.listaUsuarios=usuarios;
    }, (error)=>{
      console.log(error);
    });
  }

  createUsuario(usuario:Usuario):void{
    this.usuarioRef.push(usuario);
  }

  getUsuarioList():Array<Usuario>{
    return this.listaUsuarios
  }

  obtenerUsuario(correo:string){
    this.listaUsuarios.forEach(function(usuario){
      if(usuario.correo==correo){
        localStorage.setItem('user',JSON.stringify(usuario))
      }
    })
  }

  deslogearUsuario(){
    localStorage.removeItem("user");
    
    this.router.navigateByUrl('/login');
    

  }

  verifyUsuarios(unUsuario:Usuario):boolean{
    let flag:boolean=false;
    this.listaUsuarios.forEach(function(usuario){
      if(unUsuario.correo==usuario.correo){
       flag=true;
      }
    })
    return flag
  }

}
