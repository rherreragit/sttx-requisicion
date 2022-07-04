//Bibliotecas
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Servicios
import { LnprodService } from '../../services/lnprod.services';

//Modelos
import { Lnprod } from '../../models/lnprod.model';

//Dependencias de Kendo
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-busqueda-lnprod',
  templateUrl: './busqueda-lnprod.component.html',
  styleUrls: ['./busqueda-lnprod.component.css'],
  providers: [LnprodService]
})
export class BusquedaLnprodComponent implements OnInit {

  public lnprods: Lnprod[] = new Array<Lnprod>();
  public vistaGrid: GridDataResult;
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
        { field: 'lnprod_codigo', operator: 'contains', value: this.filtro },
        { field: 'lnprod_desc', operator: 'contains', value: this.filtro }
      ]
    }
  };
  @Output() lnprod: EventEmitter<Lnprod>;
  @Input() lnprodSeleccionada : string = "";
  @Input() Instancia2;

  constructor(private _lnprodService: LnprodService) { 
    this.lnprod = new EventEmitter();
  }

  ngOnInit() {
  

    this._lnprodService.obtenerLnprod().subscribe(
      response => {
      
        if (response.tt_out_lnprodRow != undefined) {
          if (response.tt_out_lnprodRow.length != undefined) {
            for (let i = 0; i < response.tt_out_lnprodRow.length; i++) {
            
            let lnprod: Lnprod = new Lnprod(
              response.tt_out_lnprodRow[i].ttlnprod_out_linea,
              response.tt_out_lnprodRow[i].ttlnprod_out_linea_desc
              );
             this.lnprods.push(lnprod);

            }
            //Ejecuta el evento Carga Items que pagina el GRID
            this.loadItems();
          }
          else {
            let lnprod: Lnprod = new Lnprod(
              response.tt_out_lnprodRow.ttlnprod_out_linea,
              response.tt_out_lnprodRow.ttlnprod_out_linea_desc
            )
             this.lnprods.push(lnprod);
             //Ejecuta el evento Carga Items que pagina el GRID
             this.loadItems();        
          } 
        } 
      },
      error => {
        console.error("Hubo un problema de comunicacion con el WebService" + error);
      } 
    );

  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  loadItems(): void {
    this.vistaGrid = {
      data: this.lnprods.slice(this.skip, this.skip + this.pageSize),
      total: this.lnprods.length
    };
  }

  filtrar(e) {
    this.state.filter.filters[0]["value"] = this.filtro;
    this.state.filter.filters[1]["value"] = this.filtro;
    this.vistaGrid = process(this.lnprods, this.state)
    if (this.filtro == "") {
      this.loadItems();
    }
  }

  seleccionarLnprod(lnprod: Lnprod) {
    this.lnprodSeleccionada = lnprod.lnprod_codigo;
    this.lnprod.emit(lnprod);
  }

  regresarLn(){
    let ln : Lnprod = new Lnprod(this.lnprodSeleccionada,'');
    this.lnprod.emit(ln);
  }

}
