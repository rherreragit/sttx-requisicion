import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment';

//Servicios 
import { AccesoService } from '../../services/acceso.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export let ROUTES: RouteInfo[] = [];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [AccesoService]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuOculto : boolean;
  @Output() Menu: EventEmitter<boolean>;

  constructor(private _accesoService : AccesoService) {
    this.Menu = new EventEmitter();

    this.menuItems = [];
    ROUTES = [];

    this._accesoService.obtenerMenus().subscribe(
      response => {
        let menus = response.root.RolesUsr;
        
        for(let i=0; i < menus.length; i++){
          //Generacion de Menu Dinamico
          if(menus[i].subdesc == "Catalogo Alta"){
             let MenuTMP = { path: '/CatalogoAlta', title: 'Catalogo Alta', icon: 'label', class: '' };
             ROUTES.push(MenuTMP);
          }
          if(menus[i].subdesc == "Catalogo Consulta"){
             let MenuTMP = { path: '/CatalogoConsulta', title: 'Catalogo Consulta', icon: 'label', class: '' };
             ROUTES.push(MenuTMP);
          }
          if(menus[i].subdesc == "Aprobador Alta"){
             let MenuTMP = { path: '/AprobadorAlta', title: 'Aprobador Alta', icon: 'label', class: '' };
             ROUTES.push(MenuTMP);
          }
          if(menus[i].subdesc == "Aprobador Consulta"){
             let MenuTMP = { path: '/AprobadorConsulta', title: 'Aprobador Consulta', icon: 'label', class: '' };
             ROUTES.push(MenuTMP);
          }
          if(menus[i].subdesc == "Requisicion Alta"){
            let MenuTMP = { path: '/RequisicionAlta', title: 'Requisicion Alta', icon: 'label', class: '' };
            ROUTES.push(MenuTMP);
         }
         if(menus[i].subdesc == "Requisicion Consulta"){
          let MenuTMP = { path: '/RequisicionConsulta', title: 'Requisicion Consulta', icon: 'label', class: '' };
          ROUTES.push(MenuTMP);
         }
         if(menus[i].subdesc == "Requisicion Aprobacion"){
          let MenuTMP = { path: '/RequisicionAprobacion', title: 'Requisicion Aprobacion', icon: 'label', class: '' };
          ROUTES.push(MenuTMP);
         }                  
        }

        this.generarMenu();

      },
      error => {
        console.error(error);
        Swal.fire('Error!','Ocurrio un problema al verificar el Menu','error');
      }
    );
    

   }

  ngOnInit() {
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    //this.menuOculto = false;
  }

  generarMenu(){
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
      this.Menu.emit(false);
  };

  obtenerAmbiente(){
    let path = "http://" + window.location.host.split(':')[0] + '/web-sttx/principal.html';
    return path;
  }

  ocultarMenu(){
    this.Menu.emit(true);
  }

}
 