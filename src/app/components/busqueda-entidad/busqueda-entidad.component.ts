//Bibliotecas
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


//Servicios
import { configuracionService } from '../../services/configuracion.service';

//Dependencias KENDO
import { RowArgs } from '@progress/kendo-angular-grid';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { from } from 'rxjs';

//Secccion de pruebas
import { MatInputModule } from '@angular/material/input';

export interface Entidad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-busqueda-entidad',
  templateUrl: './busqueda-entidad.component.html',
  styleUrls: ['./busqueda-entidad.component.css'],
  providers: [configuracionService]
})
export class BusquedaEntidadComponent implements OnInit {

  public bloqueado_1: boolean = false;
  public bloqueado_2: boolean = true;
  public entidades = [];
  public entidadSelected: string = "";
  public Descripcion: string = "";


  //Paramentro para buscar Entidad y Descripcion
  @Input() public set EntidadSeleccionada(value: string) {
    this.entidadSelected = value;
  
    const entity = this.entidades.find(element => element.value === value)
    
      if (entity !== undefined){
      this.Descripcion = entity.viewValue;
    } else
    { 
      this.Descripcion = "";
    } 
  
  } 

  // Parametro para bloquear Entidad
  @Input() public set Bloqueado(value: boolean) {
    this.bloqueado_1 = value;
  } 



  @Output() entidad: EventEmitter<string>; 
 

  constructor(private formBuilder: FormBuilder, private _configuracionService: configuracionService) {
    
    this.entidad = new EventEmitter<string>();
   }

  ngOnInit() {
       // Busqueda de Tipos a cargar en Combo-box
       this._configuracionService.obtenerConfiguracion("wsreqa_mstr", "").subscribe(
        response => {
          if (response.root.code_mstr) {
            if (response.root.code_mstr.length) {
              for (var i = 0; i < response.root.code_mstr.length; i++) {
                this.entidades.push({
                  value: response.root.code_mstr[i].valor,
                  viewValue: response.root.code_mstr[i].cmmt
                });
              }
            }
            else {
              this.entidades.push({
                value: response.root.code_mstr.valor,
                viewValue: response.root.code_mstr.cmmt
              });
            }
          }
        }, error => {
          console.error("Ocurrio un error");
        }
    
      );
  }

  SelectEntidad(entidad) {
    this.entidadSelected = entidad.value;
    this.Descripcion = entidad.viewValue;
    this.entidad.emit(this.entidadSelected);
  }

}
