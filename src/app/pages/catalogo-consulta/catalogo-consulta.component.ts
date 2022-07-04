//Bibliotecas
import { Component, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//Servicios
import { configuracionService } from '../../services/configuracion.service';
import { UserService } from '../../services/user.service';
import { CatalogoService } from '../../services/catalogo.service';

//Modelos
import { User } from '../../models/user.model';
import { Parte } from '../../models/parte.model';
import { Lnprod } from '../../models/lnprod.model';
import { Catalogo } from '../../models/catalogo.model';

//Dependencias KENDO
import { RowArgs } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { from } from 'rxjs';
import { stringify } from 'querystring';
import { IntlService } from '@progress/kendo-angular-intl';

//Enviroments
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-catalogo-consulta',
  templateUrl: './catalogo-consulta.component.html',
  styleUrls: ['./catalogo-consulta.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CatalogoService, configuracionService, UserService]
})
export class CatalogoConsultaComponent implements OnInit {

  
  public parte1: Parte = new Parte('','','','','','');
  public parte2: Parte = new Parte('','','','','','');
  
  public lnprod: Lnprod = new Lnprod("","");
  public oculto_1: boolean = true;
  public oculto_2: boolean = true;
  public LnProd_Filtro = new Array();
  public bloqueado_1: boolean = true;

  public gridData: Catalogo[] = new Array<Catalogo>();

  public Diferencias: string = "";

  constructor(private _CatalogoService: CatalogoService, 
    private formBuilder: FormBuilder, 
    private _configuracionService: configuracionService, 
    private _UserService: UserService) { }

  ngOnInit() {
   // Busqueda de Tipos a cargar en Combo-box
   this._configuracionService.obtenerConfiguracion("wsreq_mstr", "catalogo_lp").subscribe(
    response => {  
      for (var i = 0; i < response.root.code_mstr.length; i++) {
        this.LnProd_Filtro = response.root.code_mstr[i].cmmt.split(",");
        }
    }, error => {
      console.error("Ocurrio un error");
    }

  );    
  }
  obtenerParte1(parte: Parte) {
    this.parte1 = parte;  
}

obtenerParte2(parte: Parte) {
    this.parte2 = parte;
}

obtenerLnprod(lnprod: Lnprod) {
 this.lnprod = lnprod;  

}

Buscar() {

 this._CatalogoService.obtenerCatalogo(this.parte1.parte_int, this.parte2.parte_int, this.lnprod.lnprod_codigo, "").subscribe(
   response => {
     this.llena_grids(response);
     this.oculto_1 = false;
   },
   error => {
     console.error("Hubo un problema de comunicacion con el WebService" + error);
   } 
 );
}


llena_grids(response){
 //Limpia el Grid de OCs
 this.gridData = new Array<Catalogo>();

 if (response.tt_out_wsreqcRow != undefined) {
   if (response.tt_out_wsreqcRow.length != undefined) {
     for (let i = 0; i < response.tt_out_wsreqcRow.length; i++) {
      
       let registro: Catalogo = new Catalogo(
         response.tt_out_wsreqcRow[i].ttwsreqc_out_parte,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_desc,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_um,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_lnprod,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_status,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_inventariable,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_cuenta,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_subcuenta,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_cc,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_usuario,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_fecha,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_hora,
         response.tt_out_wsreqcRow[i].ttwsreqc_out_dif
         );
                  
       this.gridData.push(registro);
     }
   } else {

     let registro: Catalogo = new Catalogo(
       response.tt_out_wsreqcRow.ttwsreqc_out_parte,
       response.tt_out_wsreqcRow.ttwsreqc_out_desc,
       response.tt_out_wsreqcRow.ttwsreqc_out_um,
       response.tt_out_wsreqcRow.ttwsreqc_out_lnprod,
       response.tt_out_wsreqcRow.ttwsreqc_out_status,
       response.tt_out_wsreqcRow.ttwsreqc_out_inventariable,
       response.tt_out_wsreqcRow.ttwsreqc_out_cuenta,
       response.tt_out_wsreqcRow.ttwsreqc_out_subcuenta,
       response.tt_out_wsreqcRow.ttwsreqc_out_cc,
       response.tt_out_wsreqcRow.ttwsreqc_out_usuario,
       response.tt_out_wsreqcRow.ttwsreqc_out_fecha,
       response.tt_out_wsreqcRow.ttwsreqc_out_hora,
       response.tt_out_wsreqcRow.ttwsreqc_out_dif
       );
       

     this.gridData.push(registro);
   }
 }
} // Termina llena_grids

public cellClickHandlerErrors({ sender, rowIndex, columnIndex, dataItem, isEdited}) {
  if(dataItem.cat_diferencia === "") {
    this.oculto_2 = true;
  } else {
   this.oculto_2 = false;
   this.Diferencias = dataItem.cat_diferencia;
  } 
}


  //Pintar GRID segun condicion
  public rowCallback(context: RowClassArgs) {
    let warning = false;
    let normal  = false;

    if (context.dataItem.cat_diferencia !== "") {
      warning = true;      
      normal  = false;
    } else {
      warning = false;      
      normal  = true;

    }

    return {
      warning: warning,
      normal: normal
    };
  }   
  
} //OnInit
