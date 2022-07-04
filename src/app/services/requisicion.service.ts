//Bibliotecas
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//Control de Ambientes
import { environment } from '../../environments/environment';

//Servicios
import { UserService } from '../services/user.service';

//Modelos
import { User } from '../models/user.model';
import {RequisicionMaster, RequisicionDetail, RequisicionTax } from '../models/requisicion.model';

@Injectable()
export class RequisicionService{
    public url : string;

    constructor(private _http: HttpClient, private _userService: UserService){
        this.url = environment.apiurl;
    }

    AgregarParte(entidad:string, proveedor:string, parte:string) : Observable<any>{ 
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/requisiciones/requisicion.php?' + "dominio=" + user.dominio +
        "&entidadx=" + entidad + "&proveedor=" + proveedor + 
        "&parte=" + parte;
        //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers}); 
    }


    enviarRequisicion(iReq_number: string, ientidad: string, iReq_Desc: string, iproveedor: string, gridjson_1: RequisicionDetail[],  iAction:string): Observable<any> {
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers', '*');
        headers.append('content-type', 'application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let API = '/requisiciones/requisicion.php';
        //Enviar Parametros
        let params = new FormData();
        params.append('dominio', user.dominio);
        params.append('usuario', user.userid);
        params.append('accion', iAction);
        params.append('requisicion', iReq_number);
        params.append('entidad', ientidad);
        params.append('descripcion', iReq_Desc);
        params.append('proveedor', iproveedor);
        
        params.append('gridjson_lista', JSON.stringify(gridjson_1));
    
        //Realizar la peticion AJAX
        return this._http.post(this.url + API, params, { headers: headers });
        } 

        buscarRequisicion(iReq_number: string,) : Observable<any>{ 
            //Definir Cabezeras de la peticion AJAX
            let headers = new HttpHeaders();
            headers.append('Access-Control-Request-Headers','*');
            headers.append('content-type','application/json');
            //Obtener Sesion de Usuario
            let user: User = this._userService.obtenerusuario();
            //Armar URL
            let params = '/requisiciones/requisicion.php?' + "dominio=" + user.dominio +
            "&requisicion=" + iReq_number;
            //Realizar la peticion AJAX
            return this._http.get(this.url+params, {headers: headers}); 
        }

        consultarRequisicion(iReq_number: string,) : Observable<any>{ 
            //Definir Cabezeras de la peticion AJAX
            let headers = new HttpHeaders();
            headers.append('Access-Control-Request-Headers','*');
            headers.append('content-type','application/json');
            //Obtener Sesion de Usuario
            let user: User = this._userService.obtenerusuario();
            //Armar URL
            let params = '/requisiciones/requisicion.php?' + "dominio=" + user.dominio +
            "&Req_number=" + iReq_number;
            //Realizar la peticion AJAX
            return this._http.get(this.url+params, {headers: headers}); 
        }

        pendientesRequisicion(ientidad:string) : Observable<any>{ 
            //Definir Cabezeras de la peticion AJAX
            let headers = new HttpHeaders();
            headers.append('Access-Control-Request-Headers','*');
            headers.append('content-type','application/json');
            //Obtener Sesion de Usuario
            let user: User = this._userService.obtenerusuario();
            //Armar URL
            let params = '/requisiciones/requisicion.php?' + "dominio=" + user.dominio +
            "&entidady=" + ientidad + "&usuario=" + user.userid;
            //Realizar la peticion AJAX
            return this._http.get(this.url+params, {headers: headers}); 
        }

}