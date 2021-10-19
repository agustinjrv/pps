import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Meta } from 'src/app/clases/Meta/meta';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MetasService {

  public pathMetas = '/metas';
  public coleccionMetas: AngularFirestoreCollection<any>;
  public listaMetas;

  constructor(private bd: AngularFirestore,
              private servicioAuth: AuthService,
              private router:Router) {
              this.coleccionMetas = this.bd.collection(this.pathMetas);
  }

  public AgregarUno(unaMeta: Meta)
  {
      return this.AgregarMeta(unaMeta);
  }

  private AgregarMeta(unaMeta: Meta) {

    unaMeta.id=this.bd.createId();
    return this.coleccionMetas.doc(unaMeta.id).set({ ...unaMeta });
  }

  public TraerTodos() {
    return this.coleccionMetas;
  }

  public BorrarUno(unaMeta:Meta) {
    this.coleccionMetas.doc(unaMeta.id).delete();
  }

  public ModificarUno(unaMeta: Meta) {
    this.coleccionMetas.doc(unaMeta.id).set({ ...unaMeta }).then(() => {

        console.log('Modificado');
    });
  }
}
