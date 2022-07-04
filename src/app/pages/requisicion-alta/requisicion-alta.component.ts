import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//Servicios
import { RequisicionService } from '../../services/requisicion.service';
import { ProveedorService } from '../../services/proveedor.service';
import { NotificacionService } from '../../services/notificacion.service';

//Modelos
import { User } from '../../models/user.model';
import {RequisicionMaster, RequisicionDetail, RequisicionTax } from '../../models/requisicion.model';
import { Proveedor } from '../../models/proveedor.model';
import { Catalogo } from '../../models/catalogo.model';

import { parse } from 'querystring';

//Middlewares
import { formatted } from '../middlewares/reqformat';

//Dependencias KENDO
import { RowArgs } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { from } from 'rxjs';
import { stringify } from 'querystring';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-requisicion-alta',
  templateUrl: './requisicion-alta.component.html',
  styleUrls: ['./requisicion-alta.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RequisicionService, ProveedorService, NotificacionService]
})
export class RequisicionAltaComponent implements OnInit {

  public comparticulo : boolean = true;
  public bloqueado_1: boolean = true;
  public bloqueado_2: boolean = false;
  public oculto_1: boolean = true;
  public oculto_2: boolean = true;
  public Req_number: string = '00000000';
  public Req_Desc: string = "";
  public Entidad: string = "";
  public Req_Status: string = "";
  public Req_Parte: string = "";
  public Req_ParteDesc: string = "";
  public Req_Cantidad: number = 0;
  public Req_UM: string = "";
  public Req_Precio: number = 0;
  public Req_Moneda: string = "";
  public proveedor: Proveedor = new Proveedor('','','');
  public articulo: Catalogo = new Catalogo('','','','','','','','','','','','','');
  public Parte_Seleccionada : string = null;
  public Proveedor_Seleccionado : string = null;
  public Entidad_Seleccionada : string = null;
  public Diferencias: string = "";
 

  public gridData: RequisicionDetail[] = new Array<RequisicionDetail>();
  public gridDataImp: RequisicionTax[] = new Array<RequisicionTax>();

  constructor( private formBuilder: FormBuilder, 
               private _RequisicionService: RequisicionService, 
               private _proveedorService: ProveedorService,
               private _notificacionService: NotificacionService,) { }

  ngOnInit() {
        //Limpia el Grid de Requisiciones
        this.gridData = new Array<RequisicionDetail>();
        this.gridDataImp = new Array<RequisicionTax>();

  }

  entidadSelect(entidadSelected){
    this.Entidad = entidadSelected;
  }

  Buscar_Req() {
    
    this.oculta_diferencias();

    if (this.Req_number !== '00000000') {
          this._RequisicionService.buscarRequisicion(this.Req_number).subscribe(
            response => {
                 if (response.ostatus == '200') {
                       //Asigna valores en Hijos
                       this.Proveedor_Seleccionado = response.oproveedor;
                       this.Entidad_Seleccionada = response.oentidad;
                       
                     
                       //Asigna valores en Padre
                       this.Entidad = response.oentidad;
                       this.proveedor.proveedor = response.oproveedor;
                       this.Req_Desc = response.odescripcion;
                       this.Req_Moneda = response.omoneda;
                       this.Req_Status = response.oreqm_status;
      
                       //Despliega Detalle e Impuestos
                       this.llena_grid_action(response);
                       this.oculto_1 = false;
      
                       //Seccion para deshabilitar 
                       if (response.oreqm_status !== '') {
                        this.bloqueado_2 = true; 
                        
                      } else {
                        this.bloqueado_2 = false;
                      }
                      
                  } else {
                       swal.fire("Aviso!", response.ostatus_desc, "warning");
                  } 
      
            },
            error => {
              console.error("Hubo un problema de comunicacion con el WebService" + error);
            }
          );
    } else {
        //Limpia el Grid de Requisiciones
        this.gridData = new Array<RequisicionDetail>();
        this.gridDataImp = new Array<RequisicionTax>();
        this.Req_Desc = "";
        this.Entidad = "";
        this.proveedor.proveedor = "";
        this.Req_Moneda = "";
        this.Req_Status = "";

        //Asigna valores en Hijos
        this.Proveedor_Seleccionado = "";
        this.Entidad_Seleccionada = "";
        
        // Habilita campos
        this.bloqueado_2 = false;
    }

  }


  obtenerProveedor(proveedor: Proveedor) {
    this.proveedor = proveedor;
    this.Req_Moneda = proveedor.moneda;

    this._proveedorService.obtenerImpuesto(this.proveedor.proveedor).subscribe(
      response => {
        this.llena_gridImp(response); 
        this.ActualizaImpuestos();    
      },
      error => {
        swal.fire("Aviso!", "Error en WebService Proveedor", "warning");
      }
    );
    

  }

  obtenerArticulo(articulo: Catalogo) {
    this.Req_Parte = articulo.cat_parte;    
    this.Req_ParteDesc = articulo.cat_parte_desc;
    this.Req_UM = articulo.cat_um;
  }

  Agregar() {
      this.oculta_diferencias();

      // Valida Descripcion General
      if ((this.Req_Desc == "") || (this.Req_Desc == null)) {
        swal.fire("Aviso!", "Descripcion General vacia", "warning"); 
      return;
      }

      // Valida Entidad
      if ((this.Entidad == "") || (this.Entidad == null)) {
        swal.fire("Aviso!", "Entidad no Seleccionada", "warning"); 
      return;
      }

      // Valida Proveedor
      if ((this.proveedor.proveedor == "") || (this.proveedor.proveedor == null)) {
        swal.fire("Aviso!", "Proveedor no Seleccionado", "warning"); 
      return;
      }

      // Valida Articulo
      if ((this.Req_Parte == "") || (this.Req_Parte == null)) {
        swal.fire("Aviso!", "Articulo no Seleccionado", "warning"); 
      return;
      }

      // Valida Descripcion Articulo
      if ((this.Req_ParteDesc == "") || (this.Req_ParteDesc == null)) {
        swal.fire("Aviso!", "Articulo sin Descripcion", "warning"); 
      return;
      }

      // Valida Cantidad
      if (this.Req_Cantidad == 0) {
        swal.fire("Aviso!", "Cantidad es Cero", "warning"); 
      return;
      }


      // Valida UM
      if ((this.Req_UM == "") || (this.Req_UM == null)) {
        swal.fire("Aviso!", "UM vacia, Seleccione un Articulo", "warning"); 
      return;
      }

      // Valida Precio
      if (this.Req_Precio == 0) {
        swal.fire("Aviso!", "Precio es Cero", "warning"); 
      return;
      }

      // Valida Moneda
      if ((this.Req_Moneda == "") || (this.Req_Moneda == null)) {
        swal.fire("Aviso!", "Moneda vacia, Seleccione Proveedor", "warning"); 
      return;
      }  

      const ParteDuplicada = this.gridData.find(element => element.reqd_parte.toUpperCase() === this.Req_Parte.toUpperCase());
      if (ParteDuplicada !== undefined){
        swal.fire("Aviso!", "Articulo ya ha sido Agregado", "warning"); 
      return;        
      } 

      this.Parte_Seleccionada = null;
      // Seccion para agregar la parte al Grid 
      this._RequisicionService.AgregarParte(this.Entidad,this.proveedor.proveedor,this.Req_Parte).subscribe(
        response => {
             if (response.ostatus == '200') {
                   this.llena_grids(response);
                   this.oculto_1 = false;                
              } else {
                   swal.fire("Aviso!", response.ostatus_desc, "warning");
              }

        },
        error => {
          console.error("Hubo un problema de comunicacion con el WebService" + error);
        }
      );
  }


  llena_grids(response){

    let Monto : number = (this.Req_Cantidad *  this.Req_Precio);
    let registro: RequisicionDetail = new RequisicionDetail(
      '0',
      response.opart,
      this.Req_ParteDesc,
      response.ocuenta,
      response.osubcuenta,
      response.occ,
      this.Req_Cantidad,
      this.Req_UM,
      this.Req_Precio,
      Monto,
      ''
    );
    this.gridData.push(registro);

    this.ActualizaImpuestos();
    
    //Limpia Parte Seleccionada
    this.Parte_Seleccionada = "";
    this.Req_UM = "";
 
   
  }

  public ActualizaImpuestos() {
    //Recorrer Grid Articulos para obtener Total
    let Importe_Total: number = 0;
    for (let i = 0; i < this.gridData.length; i++){
      Importe_Total = +Importe_Total + +this.gridData[i].reqd_total;
    }

    let Monto_Total: number = 0;
    //Recorrer Grid Impuestos para actualizar valores
    for (let i = 0; i < this.gridDataImp.length; i++){
        this.gridDataImp[i].reqi_total = parseFloat((this.gridDataImp[i].reqi_factor * (Importe_Total)).toFixed(2));
        this.gridDataImp[i].reqi_monto = Importe_Total;
      
      if(this.gridDataImp[i].reqi_nivel !== 99) {
         Monto_Total = (Monto_Total + this.gridDataImp[i].reqi_total);
      }


      if(this.gridDataImp[i].reqi_nivel == 99) {
        this.gridDataImp[i].reqi_total = parseFloat(Monto_Total.toFixed(2));
      }      

    }    
  }

  public Eliminar(index, dataItem) {
    this.gridData.splice(index, 1);
    this.ActualizaImpuestos();
  }

  llena_gridImp(response){
    //Limpia el Grid de OCs
    this.gridDataImp = new Array<RequisicionTax>();

    //Seccion para agregar el importe en Grid Impuestos
    let importe: RequisicionTax = new RequisicionTax(
      '0',
      0,
      'Importe',
      1,
      0,
      0
    );
    this.gridDataImp.push(importe);

   // Seccion para llenar los impuestos en Grid Impuestos
    if (response.tt_out_taxable.tt_out_taxableRow != undefined) {
      if (response.tt_out_taxable.tt_out_taxableRow.length != undefined) {
        for (let i = 0; i < response.tt_out_taxable.tt_out_taxableRow.length; i++) {
         
          let impuesto: RequisicionTax = new RequisicionTax(
            '0',
            response.tt_out_taxable.tt_out_taxableRow[i].tttax_nivel,
            response.tt_out_taxable.tt_out_taxableRow[i].tttax_etiqueta,
            response.tt_out_taxable.tt_out_taxableRow[i].tttax_factor,
            response.tt_out_taxable.tt_out_taxableRow[i].tttax_monto,
            response.tt_out_taxable.tt_out_taxableRow[i].tttax_total
            );
                     
          this.gridDataImp.push(impuesto);
        }
      } else {
   
        let impuesto: RequisicionTax = new RequisicionTax(
          '0',
          response.tt_out_taxable.tt_out_taxableRow.tttax_nivel,
          response.tt_out_taxable.tt_out_taxableRow.tttax_etiqueta,
          response.tt_out_taxable.tt_out_taxableRow.tttax_factor,
          response.tt_out_taxable.tt_out_taxableRow.tttax_monto,
          response.tt_out_taxable.tt_out_taxableRow.tttax_total
          );
          
   
        this.gridDataImp.push(impuesto);
      }
    }

    let total: RequisicionTax = new RequisicionTax(
      '0',
      99,
      'Total',
      0,
      0,
      0
    );
    this.gridDataImp.push(total);

   } // Termina llena_grids


  // Only Numbers with Decimals
  keyPressNumbersWithDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
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

  Guardar() {
    this.oculta_diferencias();

    swal.fire({
      title: '¿Enviar Notificacion?',
      text: "Para continuar despues con la captura de la Requisicion presiona Guardar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#adb0a5',
      cancelButtonColor: '#DD6B55',
      confirmButtonText: 'Solicitar Autorizacion',
      cancelButtonText: 'Guardar'
    }).then((result) => {
      if (result.value) {
        this.setrequisicion(this.gridData, "AUTHORIZE");
      } else {
        this.setrequisicion(this.gridData, "SAVE");
      }
    })


}


setrequisicion(lista_partes, accion){ 
  this._RequisicionService.enviarRequisicion(this.Req_number, this.Entidad, this.Req_Desc, this.proveedor.proveedor, lista_partes, accion).subscribe(
   response => {
      if(response.ostatus == '200') {
        this.llena_grid_action(response);
        this.Req_number = response.oreqm_requisicion;
        this.Req_Status = response.oreqm_status;
        
        if (response.oreqm_status !== '') {
          this.bloqueado_2 = true;
        } else {
          this.bloqueado_2 = false;
        }
        swal.fire("OK!", "Datos Guardados Correctamente en Requisicion: " + response.oreqm_requisicion, "success");
      } else {
        swal.fire("Aviso!", response.ostatus_desc, "warning");
      }

  
   }, error => {
     console.error(error);
   }
 );

}


llena_grid_action(response) {
    //Limpia Grid de Requisicion Detalle
    this.gridData = new Array<RequisicionDetail>();

    if (response.tt_out_wsreqd_det.tt_out_wsreqd_detRow != undefined) {
      if (response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.length != undefined) {
        for (let i = 0; i < response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.length; i++) {
 
          let registro: RequisicionDetail = new RequisicionDetail(
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
            response.tt_out_wsreqd_det.tt_out_wsreqd_detRow[i].ttreqd_out_error_desc,
            );
                     
          this.gridData.push(registro);
        }
      } else {

        let registro: RequisicionDetail = new RequisicionDetail(

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
          response.tt_out_wsreqd_det.tt_out_wsreqd_detRow.ttreqd_out_error_desc

          );
          
  
        this.gridData.push(registro);
      }
    }

    //Limpia Grid de Requisicion Impuesto  
    this.gridDataImp = new Array<RequisicionTax>();

    if (response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow != undefined) {
      if (response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.length != undefined) {
        for (let i = 0; i < response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.length; i++) {
 
          let registro: RequisicionTax = new RequisicionTax(
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_requisicion,
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_nivel,
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_etiqueta,
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_factor,
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_monto,
            response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow[i].ttreqi_out_total,
     
            );
                     
          this.gridDataImp.push(registro);
        }
      } else {

        let registro: RequisicionTax = new RequisicionTax(
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_requisicion,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_nivel,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_etiqueta,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_factor,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_monto,
          response.tt_out_wsreqi_mstr.tt_out_wsreqi_mstrRow.ttreqi_out_total

          );
          
  
        this.gridDataImp.push(registro);
      }
    }    

}

formatear(){
  this.Req_number = formatted(this.Req_number);
}

  //Pintar GRID segun condicion
  public rowCallback(context: RowClassArgs) {
    let warning = false;
    let normal  = false;

    if (context.dataItem.reqd_error_desc !== "") {
      
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


  public cellClickHandlerDetalle({ sender, rowIndex, columnIndex, dataItem, isEdited}) {
    if(dataItem.reqd_error_desc === "") {
      this.oculto_2 = true;
     } else {
      this.oculto_2 = false;
      this.Diferencias = dataItem.reqd_error_desc;
     } 
  
     if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, this.createFormGroupDetalle(dataItem));
    } 
  
  
   }
  
   public createFormGroupDetalle(dataItem: any): FormGroup {
    return this.formBuilder.group({
      'reqd_parte_desc': dataItem.reqd_parte_desc,
      'reqd_cc': dataItem.reqd_cc,
      'reqd_cantidad': dataItem.reqd_cantidad,
      'reqd_precio': dataItem.reqd_precio,
    });
  }

  public cellCloseHandlerDetalle(args: any) {

    const { formGroup, dataItem } = args;    

    if (formGroup.value.reqd_parte_desc !== "" && formGroup.value.reqd_parte_desc !== "null"){
  
          dataItem.reqd_parte_desc = formGroup.value.reqd_parte_desc;
              
            for(let x =0; x < this.gridData.length; x++){
              if(this.gridData[x].reqd_parte == dataItem.reqd_parte){
                  this.gridData[x].reqd_parte_desc = dataItem.reqd_parte_desc;
              }
            }                
      
    }    

    if (formGroup.value.reqd_cantidad !== "" && formGroup.value.reqd_cantidad !== "null"){
          if(!isNaN(formGroup.value.reqd_cantidad)){
      
              dataItem.reqd_cantidad = parseFloat(formGroup.value.reqd_cantidad).toFixed(4);
                  
                for(let x =0; x < this.gridData.length; x++){
                  if(this.gridData[x].reqd_parte == dataItem.reqd_parte){
                      this.gridData[x].reqd_cantidad = dataItem.reqd_cantidad;
                      this.gridData[x].reqd_total = (dataItem.reqd_cantidad * dataItem.reqd_precio);
                  }
                }         
          }
    }

    if (formGroup.value.reqd_cc !== "" && formGroup.value.reqd_cc !== "null"){
 
          dataItem.reqd_cc = formGroup.value.reqd_cc;
              
            for(let x =0; x < this.gridData.length; x++){
              if(this.gridData[x].reqd_parte == dataItem.reqd_parte){
                  this.gridData[x].reqd_cc = dataItem.reqd_cc;
              }
            }                 
      
    }

    if (formGroup.value.reqd_precio !== "" && formGroup.value.reqd_precio !== "null"){
      if(!isNaN(formGroup.value.reqd_precio)){
  
          dataItem.reqd_precio = parseFloat(formGroup.value.reqd_precio).toFixed(4);
              
            for(let x =0; x < this.gridData.length; x++){
              if(this.gridData[x].reqd_parte == dataItem.reqd_parte){
                  this.gridData[x].reqd_precio = dataItem.reqd_precio;
                  this.gridData[x].reqd_total = (dataItem.reqd_cantidad * dataItem.reqd_precio);
              }
            }      
      }
    }

   this.ActualizaImpuestos();
   
  }


  oculta_diferencias(){
    this.Diferencias = "";
    this.oculto_2 = true;
  }



}
