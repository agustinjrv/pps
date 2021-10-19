import { EestadoMeta } from "src/app/enumerados/EestadoMeta/eestado-meta";
import { Etipo } from "src/app/enumerados/Etipo/etipo";

export class Meta {
    public id:string;
    public nombre:string;
    public tipo:Etipo;
    public fechaCreacion:number;
    public fechaFin:number;
    public categoria:string;
    public estadoMeta:EestadoMeta=EestadoMeta.EnProceso;
}


