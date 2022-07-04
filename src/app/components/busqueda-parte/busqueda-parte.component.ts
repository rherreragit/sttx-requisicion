//Bibliotecas
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

//Servicios
import { ParteService } from '../../services/parte.service';


//Modelos
import { Parte } from '../../models/parte.model';

//Dependencias de Kendo
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-busqueda-parte',
  templateUrl: './busqueda-parte.component.html',
  styleUrls: ['./busqueda-parte.component.css'],
  providers: [ParteService]
})
export class BusquedaParteComponent implements OnInit {

  public partes: Parte[] = new Array<Parte>();
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
        { field: 'parte_int', operator: 'contains', value: this.filtro },
        { field: 'parte_desc', operator: 'contains', value: this.filtro }
      ]
    }
  };
  @Output() parte: EventEmitter<Parte>;
  @Input() parteSeleccionada : string = "";
  @Input() Instancia;
  @Input() LnProd_Filtro;

  constructor(private _parteService: ParteService) {
    this.parte = new EventEmitter();
  }

  ngOnInit() {
   
    this._parteService.obtenerPartes("","",this.LnProd_Filtro[0],this.LnProd_Filtro[1]).subscribe(
      response => {
        if (response.tt_out_partesRow != undefined) {
          if (response.tt_out_partesRow.length != undefined) {
            for (let i = 0; i < response.tt_out_partesRow.length; i++) {
            
            let part: Parte = new Parte(
              response.tt_out_partesRow[i].ttpt_out_parte_int,
              response.tt_out_partesRow[i].ttpt_out_desc1,
              response.tt_out_partesRow[i].ttpt_out_um,
              response.tt_out_partesRow[i].ttpt_out_lp,
              response.tt_out_partesRow[i].ttpt_out_lp_desc,
              response.tt_out_partesRow[i].ttpt_out_status
              );
             this.partes.push(part);

            }
            //Ejecuta el evento Carga Items que pagina el GRID
            this.loadItems();
          }
          else {
            let part: Parte = new Parte(
              response.tt_out_partesRow.ttpt_out_parte_int,
              response.tt_out_partesRow.ttpt_out_desc1,
              response.tt_out_partesRow.ttpt_out_um,
              response.tt_out_partesRow.ttpt_out_lp,
              response.tt_out_partesRow.ttpt_out_lp_desc,
              response.tt_out_partesRow.ttpt_out_status
            )
             this.partes.push(part);
             //Ejecuta el evento Carga Items que pagina el GRID
             this.loadItems();        
          }
        }
      },
      error => {
        console.error(error);
      } 
    );
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  loadItems(): void {
    this.vistaGrid = {
      data: this.partes.slice(this.skip, this.skip + this.pageSize),
      total: this.partes.length
    };
  }

  filtrar(e) {
    this.state.filter.filters[0]["value"] = this.filtro;
    this.state.filter.filters[1]["value"] = this.filtro;
    this.vistaGrid = process(this.partes, this.state)
    if (this.filtro == "") {
      this.loadItems();
    }
  }

  seleccionarParte(parte: Parte) {
    this.parteSeleccionada = parte.parte_int;
    this.parte.emit(parte);
  }

  regresarParte(){
    let artic : Parte = new Parte(this.parteSeleccionada,'','','','','');
    this.parte.emit(artic);
  }

}
