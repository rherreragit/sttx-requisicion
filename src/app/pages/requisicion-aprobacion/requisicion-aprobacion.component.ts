import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import swal from 'sweetalert2';

//Servicios
import { RequisicionService } from '../../services/requisicion.service';

//Modelos
import {RequisicionMaster, RequisicionDetail, RequisicionTax, RequisicionAprove } from '../../models/requisicion.model';

//Dependencias KENDO
import { RowArgs } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { from } from 'rxjs';
import { stringify } from 'querystring';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-requisicion-aprobacion',
  templateUrl: './requisicion-aprobacion.component.html',
  styleUrls: ['./requisicion-aprobacion.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RequisicionService]
})
export class RequisicionAprobacionComponent implements OnInit {

  constructor(private _RequisicionService: RequisicionService) { }

  ngOnInit() {
    this.gridDataEnc = new Array<RequisicionMaster>();
  }

  public oculto_1: boolean = false;
  public oculto_2: boolean = true;
  public oculto_3: boolean = true;
  public bloqueado: boolean = true;
  public bloqueado2: boolean = true;
  public Entidad: string = "";
  public renglon: number;
  public mySelection: number[] = [];

  public gridDataEnc: RequisicionMaster[] = new Array<RequisicionMaster>();
  public gridDataDet: RequisicionDetail[] = new Array<RequisicionDetail>();
  public gridDataImp: RequisicionTax[] = new Array<RequisicionTax>();


  limpia_grids(){
    //Limpia el Grid de Requisiciones
    this.gridDataEnc = new Array<RequisicionMaster>();
    this.gridDataDet = new Array<RequisicionDetail>();
    this.gridDataImp = new Array<RequisicionTax>();

   } 

   limpia_detalle(){
    //Limpia el Grid de Requisiciones
    this.gridDataDet = new Array<RequisicionDetail>();
    this.gridDataImp = new Array<RequisicionTax>();

  }

  entidadSelect(entidadSelected){
    this.Entidad = entidadSelected;
    this.limpia_grids();
          // Seccion para cargar las Requisiciones Pendientes
          this._RequisicionService.pendientesRequisicion(entidadSelected).subscribe(
            response => {
              console.log(response);
             this.llena_encabezado(response);             
             this.oculto_2 = false;
             this.oculto_3 = true;

            }, error => {
              console.error("Ocurrio un error");
            }
        
          );  
  }

  llena_encabezado(response){

    //Carga Grid de Requisiciones   
    if (response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow != undefined) {
      if (response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.length != undefined) {
        for (let i = 0; i < response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.length; i++) {
         
          let encabezado: RequisicionMaster = new RequisicionMaster(
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_requisicion,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_entidad,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_descripcion,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_proveedor,          
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_moneda,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_total,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_status,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_usuario,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_fecha,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_hora,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_oc,
            response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow[i].ttreqm_out_name
            );
                     
          this.gridDataEnc.push(encabezado);
  
        }
      } else {      
        let encabezado: RequisicionMaster = new RequisicionMaster(        
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_requisicion,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_entidad,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_descripcion,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_proveedor,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_moneda,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_total,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_status,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_usuario,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_fecha,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_hora,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_oc,
          response.tt_out_wsreqm_mstr.tt_out_wsreqm_mstrRow.ttreqm_out_name
          );
          
        this.gridDataEnc.push(encabezado);
  
       }
     }      

  }

  public cellClickHandlerErrors({ sender, rowIndex, columnIndex, dataItem, isEdited}) {
   //console.log(dataItem.reqm_requisicion);  
           this._RequisicionService.consultarRequisicion(dataItem.reqm_requisicion).subscribe(
            response => {
                 if (response.ostatus == '200') {
                  this.limpia_detalle(); 
                  this.llena_requisicion(response);
                  this.oculto_3 = false;
                  this.bloqueado2 = false;
                  } else {
                      this.limpia_detalle();
                      this.oculto_3 = true;
                      swal.fire("Aviso!", response.ostatus_desc, "warning");
                  } 
        
            },
            error => {
              console.error("Hubo un problema de comunicacion con el WebService" + error);
            }
          );

             
  }

  llena_requisicion(response){ 

    //Carga Grid Detalle
   if (response.tt_out_wsreqd_det.tt_out_wsreqd_detRow != undefined) {
    if (response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.length != undefined) {
      for (let i = 0; i < response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.length; i++) {
       
        let detalle: RequisicionDetail = new RequisicionDetail(
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_requisicion,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_parte,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_parte_desc,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_cuenta,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_subcuenta,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_cc,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_cantidad,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_um,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_precio,
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_total,
          ""
          );
                   
        this.gridDataDet.push(detalle);

      }
    } else {      
      let detalle: RequisicionDetail = new RequisicionDetail(        
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_requisicion,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_parte,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_parte_desc,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_cuenta,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_subcuenta,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_cc,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_cantidad,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_um,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_precio,
        response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_total,
        ""
        );
        
      this.gridDataDet.push(detalle);

     }
   }            

   
   //Carga Grid Impuestos
   if (response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow != undefined) {
    if (response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.length != undefined) {
      for (let i = 0; i < response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.length; i++) {
       
        let impuesto: RequisicionTax = new RequisicionTax(
          '0',
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_nivel,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_etiqueta,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_factor,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_monto,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_total
          );
                   
        this.gridDataImp.push(impuesto);
      }
    } else {
 
      let impuesto: RequisicionTax = new RequisicionTax(
        '0',
        response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_nivel,
        response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_etiqueta,
        response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_factor,
        response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_monto,
        response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_total
        );
        
 
      this.gridDataImp.push(impuesto);
     }
   }        

  }

Aprobar(){

  swal.fire({
    title: '¿Desea Aprobar Requisicion?',
    text: "Comentarios",
    input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
   // icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#adb0a5',
    cancelButtonColor: '#DD6B55',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      console.log(result);
      //this.setrequisicion(this.gridData, "AUTHORIZE");
    } else {
      console.log(result);
      //this.setrequisicion(this.gridData, "SAVE");
    }
  })

}

Denegar(){

}

}
