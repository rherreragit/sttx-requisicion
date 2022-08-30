// Modulos
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

// Componentes
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../icons/icons.component';
import { nopathComponent } from '../../nopath/nopath.component';
import { CatalogoAltaComponent } from '../../pages/catalogo-alta/catalogo-alta.component';
import { CatalogoConsultaComponent } from '../../pages/catalogo-consulta/catalogo-consulta.component';
import { AprobadorAltaComponent } from '../../pages/aprobador-alta/aprobador-alta.component';
import { AprobadorConsultaComponent } from '../../pages/aprobador-consulta/aprobador-consulta.component';
import { RequisicionAltaComponent } from '../../pages/requisicion-alta/requisicion-alta.component';
import { RequisicionConsultaComponent } from '../../pages/requisicion-consulta/requisicion-consulta.component';
import { RequisicionAprobacionComponent } from '../../pages/requisicion-aprobacion/requisicion-aprobacion.component';
import { RequisicionOcComponent } from '../../pages/requisicion-oc/requisicion-oc.component';

//Servicios
import { AccesoService } from '../../services/acceso.service';
import { UserService } from '../../services/user.service';

//Guards
import {PermisoGuard} from '../../guards/permiso.guard';

//Kendo UI Module
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';

//Directivas
import { NumberOnlyDirective } from '../../directives/numberOnly.directive';

//Pipes
import { ThousandsPipe }  from '../../pipes/ThousandsPipe';

//Modulos
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {ComponentsModule} from '../../components/components.module';


import { from } from 'rxjs';
import { importExpr } from '@angular/compiler/src/output/output_ast';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    GridModule,
    ExcelModule,
    DropDownsModule,
    DateInputsModule,
    InputsModule,
    ExcelExportModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    IconsComponent,
    nopathComponent,
    CatalogoAltaComponent,
    CatalogoConsultaComponent,
    AprobadorAltaComponent,
    AprobadorConsultaComponent,
    RequisicionAltaComponent,
    RequisicionConsultaComponent,
    RequisicionAprobacionComponent,
    RequisicionOcComponent,
    ThousandsPipe,
    NumberOnlyDirective
  ],
  providers:[
    PermisoGuard,
    AccesoService,
    UserService, 
    ThousandsPipe
  ]
})

export class AdminLayoutModule {}
