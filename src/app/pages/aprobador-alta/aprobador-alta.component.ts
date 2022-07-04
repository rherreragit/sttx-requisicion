import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

//Service
import { configuracionService } from '../../services/configuracion.service'
import { AprobadorService } from '../../services/aprobador.service'
import { UserService } from '../../services/user.service';
import { AccesoService } from '../../services/acceso.service';

//Models
import { Aprobador } from '../../models/aprobador.model'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-aprobador-alta',
  templateUrl: './aprobador-alta.component.html',
  styleUrls: ['./aprobador-alta.component.css'],
  providers: [configuracionService, AprobadorService, AccesoService]
})
export class AprobadorAltaComponent implements OnInit {
  public oculto_1: boolean = false;
  public oculto_2: boolean = true;
  public bloqueado_1: boolean = false;
  public bloqueado_2: boolean = true;
  public Usuario: string = "";
  public Monto_MN: number = 0;
  public Monto_USD: number = 0;
  public TipoCambio: number = 0;
  public Entidad: string = "";
  public fecha;
    public tempValue: number = 0;

  user: User = this._userService.obtenerusuario();

  public gridData: Aprobador[] = new Array<Aprobador>();
  
  constructor(private _configuracionService : configuracionService, 
              private _AprobadorService : AprobadorService, 
              private _userService: UserService,
              private _AccesoService: AccesoService
              ) { }

  ngOnInit() {
           // Busqueda de Tipos a cargar en Combo-box
           this._configuracionService.obtenerExchangeRate("").subscribe(
            response => {

            if (response.ostatus == '200') {
              this.TipoCambio = response.otipo_cambio;
            } else {
              swal.fire("Aviso!", response.ostatus_desc, "warning");
              this.oculto_1 = true;
              this.oculto_2 = true;
              this.bloqueado_1 = true;
            }
            }, error => {
              console.error("Ocurrio un error");
            }
        
          );   
          
        // Obtener fecha Server
        this._configuracionService.obtenerFechaserver().subscribe(
          response => {
            this.fecha = new Date(response);
          }, error => {
            console.error("Ocurrio un error");
          }
    
        );          
  }

  entidadSelect(entidadSelected){
    this.Entidad = entidadSelected;
          // Seccion para cargar los aprobadores
          this._AprobadorService.obtenerAprobador(entidadSelected).subscribe(
            response => {
              this.llena_grids(response);
              this.oculto_2 = false;
              this.Limpia();

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

    ConvierteUSD() {
      if (this.Monto_MN != null) {
         this.Monto_USD = parseFloat((parseFloat(this.Monto_MN.toString()) / parseFloat(this.TipoCambio.toString())).toFixed(2));
      }
    }
    
    ConvierteMN() {
      if (this.Monto_USD != null) {
         this.Monto_MN = parseFloat((parseFloat(this.Monto_USD.toString()) * parseFloat(this.TipoCambio.toString())).toFixed(2));
      }
    }


    Agregar() {  

        // Valida Monto MN y USD
        if ((this.Monto_MN == 0) || (this.Monto_USD == 0)) {
        swal.fire("Aviso!", "Monto en MN o USD es Cero", "warning"); 
        } else {
                // Valida el usuario agregado
                this._AccesoService.validaUsuario(this.Usuario).subscribe(
                response => { 
    
                  if ((response.root.Usuarios !== undefined) && (response.root.Usuarios.length !== null)) {
                    this.actualiza();                    
                    this.reordena();
                    this.Limpia();

                } else {
                  swal.fire("Aviso!", "Usuario no valido: " + this.Usuario, "warning");
                }
                }, error => {
                  console.error("Ocurrio un error");
                } 
            
              );
          }
    }
    
    actualiza(){

     //Seccion para actualizar valores si existe el Usuario en Grid
     let existe = false;
     for (let j = 0; j < this.gridData.length; j++) {
       if ((this.Usuario == this.gridData[j].apr_usuario) && (this.Entidad = this.gridData[j].apr_entidad)) {
         existe = true;
    
         this.gridData[j].apr_monto_mn = this.Monto_MN,
         this.gridData[j].apr_monto_usd = this.Monto_USD,
         this.gridData[j].apr_tc = this.TipoCambio,
         this.gridData[j].apr_apr_usuario = this.user.userid,
         this.gridData[j].apr_apr_fecha = this.fecha,
         this.gridData[j].apr_apr_hora = this.fecha;

       }
     }
     
     if (!existe) {
        //Seccion para agregar el registro
        let nuevo: Aprobador = new Aprobador(
          this.Entidad,
          0,
          this.Usuario,
          this.Monto_MN,
          this.Monto_USD,
          this.TipoCambio,
          true,
          this.user.userid,
          this.fecha,
          this.fecha
        );  
        this.gridData.push(nuevo);
     }

    
    }



    reordena() {
      //Seccion para ordenar por Monto MN
      this.gridData = this.gridData.sort((primerElemento, SegundoElemento) => {
        if(primerElemento.apr_monto_mn > SegundoElemento.apr_monto_mn){
          return 1;
        }
        if(primerElemento.apr_monto_mn < SegundoElemento.apr_monto_mn){
         return -1;
        }
        return 0;
      });

      //Seccion para ordenar el Usuario en Mpntos Iguales
      this.gridData = this.gridData.sort((primerElemento, SegundoElemento) => {
        if(primerElemento.apr_monto_mn == SegundoElemento.apr_monto_mn){
          if(primerElemento.apr_usuario > SegundoElemento.apr_usuario){
            return 1;
          }
          if(primerElemento.apr_usuario < SegundoElemento.apr_usuario){
           return -1;
          }
          return 0;
        }
        
      });
      
      // Seccion para Re-Ordenar el nivel
      let k = 1;
      for (let i = 0; i < this.gridData.length; i++) { 
          this.gridData[i].apr_nivel = k;
          k++;
      }
    }
        
    
    public Eliminar(index, dataItem) {
      this.gridData.splice(index, 1);
      this.reordena();

    }

    Guardar() {
  
      this._AprobadorService.saveAprobador(this.gridData, this.Entidad).subscribe(
          response => {
            
                this.llena_grids(response.tt_out_wsreqn);
    
                if (response.ostatus == "200") {
                  swal.fire("OK!", response.ostatus_desc, "success");
                } else {
                  swal.fire("Aviso!", response.ostatus_desc, "warning");
                } 
  
          }, error => {
            console.error(error);
          }
          ); 

    }

    Limpia() {
      this.Usuario = "";
      this.Monto_MN = 0;
      this.Monto_USD = 0;
    }

}
