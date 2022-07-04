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
import { Parte } from '../models/parte.model';

@Injectable()
export class ParteService{
    public url : string;

    constructor(private _http: HttpClient, private _userService: UserService){
        this.url = environment.apiurl;
    }

    obtenerPartes(parte_1:string, parte_2:string, lp_1:string, lp_2:string) : Observable<any>{
        //Definir Cabezeras de la peticion AJAX
        let headers = new HttpHeaders();
        headers.append('Access-Control-Request-Headers','*');
        headers.append('content-type','application/json');
        //Obtener Sesion de Usuario
        let user: User = this._userService.obtenerusuario();
        //Armar URL
        let params = '/partes/parte.php?' + "dominio=" + user.dominio + 
        "&parte_1=" + parte_1 + "&parte_2=" + parte_2 + 
        "&lp_1=" + lp_1 + "&lp_2=" + lp_2;
       //Realizar la peticion AJAX
        return this._http.get(this.url+params, {headers: headers});
    }

}