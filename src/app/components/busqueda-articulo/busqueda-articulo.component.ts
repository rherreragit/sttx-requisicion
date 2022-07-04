//Bibliotecas
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

//Servicios
import { CatalogoService } from '../../services/catalogo.service';

//Modelos
import { Catalogo } from '../../models/catalogo.model';

//Dependencias de Kendo
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { Parte } from 'app/models/parte.model';
import { element } from 'protractor';

@Component({
  selector: 'app-busqueda-articulo',
  templateUrl: './busqueda-articulo.component.html',
  styleUrls: ['./busqueda-articulo.component.css'],
  providers: [CatalogoService]
})
export class BusquedaArticuloComponent implements OnInit {

  public articulos: Catalogo[] = new Array<Catalogo>();
  public renglon: Catalogo = new Catalogo('','','','','','','','','','','','','');
  public vistaGrid: GridDataResult;
  public Descripcion: string = "";
  public bloqueado_1: boolean = false;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];
  public filtro: string = "";
  public state: State = {
    skip: 0,
    take: 10,

    // Descripcion del Filtro
    filter: {
      logic: 'or',
      filters: [
        { field: 'cat_parte', operator: 'contains', value: this.filtro },
        { field: 'cat_parte_desc', operator: 'contains', value: this.filtro }
      ]
    }
  };
  @Output() articulo: EventEmitter<Catalogo>;

  @Input() Instancia;

  //Parametro para buscar Articulo
  @Input()  articuloSeleccionado: string = "";

  // Parametro para bloquear Articulo
  @Input() public set Bloqueado(value: boolean) {
    this.bloqueado_1 = value;
  } 

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
     this.Descripcion = "";
    }  

  constructor(private _CatalogoService: CatalogoService) {
    this.articulo = new EventEmitter();
   }
  
  ngOnInit() {

    this._CatalogoService.obtenerCatalogo('','','','').subscribe(
      response => {
        this.llena_grids(response);
        //Ejecuta el evento Carga Items que pagina el GRID
        this.loadItems();
      },
      error => {
        console.error("Hubo un problema de comunicacion con el WebService" + error);
      }
    );
  }  



  llena_grids(response){
    //Limpia el Grid de OCs
    this.articulos = new Array<Catalogo>();
   
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
                     
          this.articulos.push(registro);
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
          
   
        this.articulos.push(registro);
      }
    }
   } // Termina llena_grids  

public pageChange(event: PageChangeEvent): void {
  this.skip = event.skip;
  this.loadItems();
}

loadItems(): void {
  this.vistaGrid = {
    data: this.articulos.slice(this.skip, this.skip + this.pageSize),
    total: this.articulos.length
  };
}

filtrar(e) {
  this.state.filter.filters[0]["value"] = this.filtro;
  this.state.filter.filters[1]["value"] = this.filtro;
  this.vistaGrid = process(this.articulos, this.state)
  if (this.filtro == "") {
    this.loadItems();
  }
}

seleccionarArticulo(articulo: Catalogo) {
  //Seccion para desplegar en el componente
  this.articuloSeleccionado = articulo.cat_parte;
  this.Descripcion = articulo.cat_parte_desc;

  //Seccion para enviar Objeto hacia el padre
  this.renglon.cat_parte = articulo.cat_parte;
  this.renglon.cat_parte_desc = articulo.cat_parte_desc;
  this.renglon.cat_um = articulo.cat_um;
  this.articulo.emit(this.renglon);
}

//Rutina para actualizar Input y reenviarla al Padre
actualizarDescripcion(inputText_Descripcion : string){
  this.renglon.cat_parte_desc = inputText_Descripcion;
  this.articulo.emit(this.renglon);
}

//Rutina para actualizar Input y reenviarla al Padre
actualizarArticulo(inputText_Articulo){
  //Actualiza vista
  this.Descripcion = "";
  //Actualiza Registro
  this.renglon.cat_um = "";
  this.renglon.cat_parte_desc = "";
  this.renglon.cat_parte = inputText_Articulo;
  this.articulo.emit(this.renglon);

}

cargarArticulo(){
  const articulo = this.articulos.find(element => element.cat_parte.toUpperCase() === this.articuloSeleccionado.toUpperCase());
  
  if (articulo !== undefined){
    this.Descripcion = articulo.cat_parte_desc;
      //Seccion para enviar la UM  al padre
      this.articulo.emit(articulo);
  } else
  { 
    this.Descripcion = "";
  } 

}



}
