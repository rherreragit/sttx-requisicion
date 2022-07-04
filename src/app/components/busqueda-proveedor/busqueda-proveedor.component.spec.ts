import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaProveedorComponent } from './busqueda-proveedor.component';

describe('BusquedaProveedorComponent', () => {
  let component: BusquedaProveedorComponent;
  let fixture: ComponentFixture<BusquedaProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
