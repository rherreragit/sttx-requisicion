import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

//Servicios
import { RequisicionService } from '../../services/requisicion.service';

//Modelos
import {RequisicionMaster, RequisicionDetail, RequisicionTax, RequisicionAprove } from '../../models/requisicion.model';

//Middlewares
import { formatted } from '../middlewares/reqformat';

//Dependencias KENDO
import { RowArgs } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { from } from 'rxjs';
import { stringify } from 'querystring';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-requisicion-consulta',
  templateUrl: './requisicion-consulta.component.html',
  styleUrls: ['./requisicion-consulta.component.css'],
  providers: [RequisicionService]
})
export class RequisicionConsultaComponent implements OnInit {

  public oculto_1: boolean = true;
  public Req_number: string = '00000000';
  public bloqueado: boolean = true;

  public gridDataEnc: RequisicionMaster[] = new Array<RequisicionMaster>();
  public gridDataDet: RequisicionDetail[] = new Array<RequisicionDetail>();
  public gridDataImp: RequisicionTax[] = new Array<RequisicionTax>();
  public gridDataApr: RequisicionAprove[] = new Array<RequisicionAprove>();

  constructor(private _RequisicionService: RequisicionService) { }

  ngOnInit() {
    this.limpia_grids();
  }

  formatear(){
    this.Req_number = formatted(this.Req_number);
  }


  limpia_grids(){
      //Limpia el Grid de Requisiciones
      this.gridDataEnc = new Array<RequisicionMaster>();
      this.gridDataDet = new Array<RequisicionDetail>();
      this.gridDataImp = new Array<RequisicionTax>();
      this.gridDataApr = new Array<RequisicionAprove>();
  }

      // Only Numbers with Decimals
      keyPressNumbers(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57)) {
          event.preventDefault();
          return false;
        } else {
          return true;
        }
      }

  Buscar_Req() {
    if (this.Req_number !== '00000000') {
      this._RequisicionService.consultarRequisicion(this.Req_number).subscribe(
        response => {
             if (response.ostatus == '200') {
              this.llena_grids(response);
              this.oculto_1 = false;
              } else {
                  this.limpia_grids();
                  this.oculto_1 = true;
                  swal.fire("Aviso!", response.ostatus_desc, "warning");
              } 
  
        },
        error => {
          console.error("Hubo un problema de comunicacion con el WebService" + error);
        }
      );
      } else {
        this.limpia_grids();
      
      }


  } 
      
  llena_grids(response){

    this.limpia_grids();

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

   //Carga Grid Detalle
   this.gridDataDet = new Array<RequisicionDetail>();

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
   this.gridDataImp = new Array<RequisicionTax>();

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

       //Carga Grid Aprobaciones   
       if (response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow != undefined) {
        if (response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.length != undefined) {
          for (let i = 0; i < response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.length; i++) {
           
            let aprobacion: RequisicionAprove = new RequisicionAprove(
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_requisicion,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_nivel,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_usuario,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_monto,          
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_moneda,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_status,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_comentario,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_fecha,
              response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow[i].ttreqa_out_hora
              );

            this.gridDataApr.push(aprobacion);
    
          }
        } else {      
          let aprobacion: RequisicionAprove = new RequisicionAprove(        
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_requisicion,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_nivel,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_usuario,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_monto,          
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_moneda,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_status,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_comentario,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_fecha,
            response.tt_out_wsreqa_mstr.tt_out_wsreqa_mstrRow.ttreqa_out_hora
            );

          this.gridDataApr.push(aprobacion);
    
         }
       } 

  }      

}
