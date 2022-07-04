//Bibliotecas
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';

//Servicios
import { ProveedorService } from '../../services/proveedor.service';

//Modelos
import { Proveedor } from '../../models/proveedor.model';

//Dependencias de Kendo
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { element } from 'protractor';

@Component({
  selector: 'app-busqueda-proveedor',
  templateUrl: './busqueda-proveedor.component.html',
  styleUrls: ['./busqueda-proveedor.component.css'],
  providers: [ProveedorService]
})
export class BusquedaProveedorComponent implements OnInit {

  public proveedores: Proveedor[] = new Array<Proveedor>();
  public renglon: Proveedor = new Proveedor('', '', '');
  public vistaGrid: GridDataResult;
  public proveedorSelected: string = "";
  public Nombre: string = "";
  public bloqueado_1: boolean = false;
  public bloqueado_2: boolean = true;
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
        { field: 'nombre', operator: 'contains', value: this.filtro },
        { field: 'proveedor', operator: 'contains', value: this.filtro }
      ]
    }
  };
  @Output() proveedor: EventEmitter<Proveedor>;
  @Input() Instancia;
 
  //Paramentro para buscar Proveedor
  @Input() public set ProveedorSeleccionado(value: string) {
    this.proveedorSelected = value;
    const supplier = this.proveedores.find(element => element.proveedor === value)
    if (supplier !== undefined) {

      this.Nombre = supplier.nombre;
    } else {
      this.Nombre = "";
    }

  }

  // Parametro para bloquear Proveedor
  @Input() public set Bloqueado(value: boolean) {
    this.bloqueado_1 = value;
  } 

  constructor(private _proveedorService: ProveedorService) {
    this.proveedor = new EventEmitter();
  }

  ngOnInit() {

    this._proveedorService.obtenerProveedores('', '').subscribe(
      response => {
        if (response.root.Proveedor) {

          //Llena la propiedad que utilizaremos para generar el dataSource del Grid
          for (var i = 0; i < response.root.Proveedor.length; i++) {
            let proveed: Proveedor = new Proveedor(
              response.root.Proveedor[i].Codigo,
              response.root.Proveedor[i].Nombre,
              response.root.Proveedor[i].Moneda
            );
            this.proveedores.push(proveed);
          }
          //Ejecuta el evento Carga Items que pagina el GRID
          this.loadItems();
        }
        else {
          this.proveedores = new Array<Proveedor>();
          this.loadItems();
          swal.fire('Sin Conexion con el Servidor', 'Favor de solicitar apoyo al equipo de TI', 'error');
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
      data: this.proveedores.slice(this.skip, this.skip + this.pageSize),
      total: this.proveedores.length
    };
  }

  filtrar(e) {
    this.state.filter.filters[0]["value"] = this.filtro;
    this.state.filter.filters[1]["value"] = this.filtro;
    this.vistaGrid = process(this.proveedores, this.state)
    if (this.filtro == "") {
      this.loadItems();
    }
  }

  seleccionarProveedor(proveedor: Proveedor) {
    //Seccion para desplegar en el componente
    this.proveedorSelected = proveedor.proveedor;
    this.Nombre = proveedor.nombre;

    //Seccion para enviar Objeto hacia el padre
    this.renglon.proveedor = proveedor.proveedor;
    this.renglon.nombre = proveedor.nombre;
    this.renglon.moneda = proveedor.moneda;
    this.proveedor.emit(this.renglon);
  }



}
