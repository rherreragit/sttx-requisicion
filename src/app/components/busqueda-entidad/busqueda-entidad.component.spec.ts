import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaEntidadComponent } from './busqueda-entidad.component';

describe('BusquedaEntidadComponent', () => {
  let component: BusquedaEntidadComponent;
  let fixture: ComponentFixture<BusquedaEntidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaEntidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
