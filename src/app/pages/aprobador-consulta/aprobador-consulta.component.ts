import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

//Service
import { AprobadorService } from '../../services/aprobador.service'

//Models
import { Aprobador } from '../../models/aprobador.model'

@Component({
  selector: 'app-aprobador-consulta',
  templateUrl: './aprobador-consulta.component.html',
  styleUrls: ['./aprobador-consulta.component.css'],
  providers: [AprobadorService]
})
export class AprobadorConsultaComponent implements OnInit {

  public oculto_1: boolean = false;
  public oculto_2: boolean = true;
  public Entidad: string = "";

  public gridData : Aprobador [] = new Array<Aprobador>();

  constructor(
    private _AprobadorService : AprobadorService
  ) { }

  ngOnInit() {

  }

  entidadSelect(entidadSelected){
    this.Entidad = entidadSelected;
          // Seccion para cargar los aprobadores
          this._AprobadorService.obtenerAprobador(entidadSelected).subscribe(
            response => {
              this.llena_grids(response);
              this.oculto_2 = false;

            }, error => {
              console.error("Ocurrio un error");
            }
        
          );  
  }

  llena_grids(response){
    //Limpia el Grid de OCs
    this.gridData = new Array<Aprobador>();
  
    if (response.tt_out_wsreqnRow != undefined) {
      if (response.tt_out_wsreqnRow.length != undefined) {
        for (let i = 0; i < response.tt_out_wsreqnRow.length; i++) {
         
          let registro: Aprobador = new Aprobador(
            response.tt_out_wsreqnRow[i].ttwsreqn_out_entidad,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_nivel,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_usuario,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_monto_mn,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_monto_usd,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_tc,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_activo,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_apr_usuario,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_apr_fecha,
            response.tt_out_wsreqnRow[i].ttwsreqn_out_apr_hora
            );
                     
          this.gridData.push(registro);
        }
      } else {

        let registro: Aprobador = new Aprobador(
            response.tt_out_wsreqnRow.ttwsreqn_out_entidad,
            response.tt_out_wsreqnRow.ttwsreqn_out_nivel,
            response.tt_out_wsreqnRow.ttwsreqn_out_usuario,
            response.tt_out_wsreqnRow.ttwsreqn_out_monto_mn,
            response.tt_out_wsreqnRow.ttwsreqn_out_monto_usd,
            response.tt_out_wsreqnRow.ttwsreqn_out_tc,
            response.tt_out_wsreqnRow.ttwsreqn_out_activo,
            response.tt_out_wsreqnRow.ttwsreqn_out_apr_usuario,
            response.tt_out_wsreqnRow.ttwsreqn_out_apr_fecha,
            response.tt_out_wsreqnRow.ttwsreqn_out_apr_hora
          );
          
  
        this.gridData.push(registro);
      }
    }
} // Termina llena_grids


}
