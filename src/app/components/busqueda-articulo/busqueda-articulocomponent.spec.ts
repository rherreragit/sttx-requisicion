import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaArticuloComponent } from './busqueda-articulo.component';

describe('BusquedaArticuloComponent', () => {
  let component: BusquedaArticuloComponent;
  let fixture: ComponentFixture<BusquedaArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
