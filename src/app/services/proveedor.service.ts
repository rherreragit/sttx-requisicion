import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Proveedor } from '../models/proveedor.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class ProveedorService{
    public url : string;

    constructor(private _http: HttpClient, private _userService: UserService){
        this.url = environment.apiurl;
    }

    obtenerProveedores(tipo_1:string, tipo_2:string) : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/proveedores/proveedor.php?' + "dominio=" + user.dominio + "&tipo=" + tipo_1 + "&tipo2=" + tipo_2;
        //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers});
    }

    obtenerImpuesto(proveedor:string) : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/proveedores/proveedor.php?' + "dominio=" + user.dominio + "&proveedor=" + proveedor;
        //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers});
    }

}