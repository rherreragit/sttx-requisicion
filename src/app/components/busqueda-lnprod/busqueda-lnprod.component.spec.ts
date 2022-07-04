import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaLnprodComponent } from './busqueda-lnprod.component';

describe('BusquedaLnprodComponent', () => {
  let component: BusquedaLnprodComponent;
  let fixture: ComponentFixture<BusquedaLnprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaLnprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaLnprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
