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
import { Lnprod } from '../models/lnprod.model';

@Injectable()
export class LnprodService{
    public url : string;

    constructor(private _http: HttpClient, private _userService: UserService){
        this.url = environment.apiurl;
    }

    obtenerLnprod() : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/partes/parte.php?' + "domain=" + user.dominio;
        //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers}); 
    }

}