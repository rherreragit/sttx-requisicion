import { Routes } from '@angular/router';

//Components
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

//Guards
import {PermisoGuard} from '../../guards/permiso.guard';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate:[PermisoGuard] },
    { path: 'other', component: IconsComponent, canActivate:[PermisoGuard]},
    { path: 'CatalogoAlta', component: CatalogoAltaComponent, canActivate:[PermisoGuard] },
    { path: 'CatalogoConsulta', component: CatalogoConsultaComponent,canActivate:[PermisoGuard]},
    { path: 'AprobadorAlta', component: AprobadorAltaComponent, canActivate:[PermisoGuard] },
    { path: 'AprobadorConsulta', component: AprobadorConsultaComponent, canActivate:[PermisoGuard] },
    { path: 'RequisicionAlta', component: RequisicionAltaComponent, canActivate:[PermisoGuard] },
    { path: 'RequisicionConsulta', component: RequisicionConsultaComponent, canActivate:[PermisoGuard] },
    { path: 'RequisicionAprobacion', component: RequisicionAprobacionComponent, canActivate:[PermisoGuard] },
    { path: 'RequisicionOC', component: RequisicionOcComponent, canActivate:[PermisoGuard] },
    { path: '**', component: nopathComponent },  
];