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
import { Catalogo } from '../models/catalogo.model';

@Injectable()
export class CatalogoService{
    public url : string;

    constructor(private _http: HttpClient, private _userService: UserService){
        this.url = environment.apiurl;
    }

    obtenerCatalogo(parte1:string, parte2:string, lp1:string, type1:string) : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/requisiciones/requisicion.php?' + "dominio=" + user.dominio +
        "&parte1=" + parte1 + "&parte2=" + parte2 + 
        "&lp1=" + lp1 + "&type=" + type1;
        //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers}); 
    }

    saveCatalogo(gridjson: Catalogo[]) : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let API = '/requisiciones/requisicion.php';
        //Enviar Parametros
        let params = new FormData();
        params.append('dominio', user.dominio); 
        params.append('usuario', user.userid);
        params.append('gridjson', JSON.stringify(gridjson));
    
        //Realizar la peticion AJAX
        return this._http.post(this.url + API, params, { headers: headers }); 
    }

}