import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BusquedaArticuloComponent } from './busqueda-articulo/busqueda-articulo.component';
import { BusquedaEntidadComponent } from './busqueda-entidad/busqueda-entidad.component';
import { BusquedaLnprodComponent } from './busqueda-lnprod/busqueda-lnprod.component';
import { BusquedaParteComponent } from './busqueda-parte/busqueda-parte.component';
import { BusquedaProveedorComponent } from './busqueda-proveedor/busqueda-proveedor.component';

//Material UI Imports
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

//Kendo UI Module
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    GridModule,
    ExcelModule,
    DropDownsModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BusquedaArticuloComponent,
    BusquedaEntidadComponent,
    BusquedaLnprodComponent,
    BusquedaParteComponent,
    BusquedaProveedorComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BusquedaArticuloComponent,
    BusquedaEntidadComponent,
    BusquedaLnprodComponent,
    BusquedaParteComponent,
    BusquedaProveedorComponent
  ]
})
export class ComponentsModule { }
