import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoConsultaComponent } from './catalogo-consulta.component';

describe('CatalogoConsultaComponent', () => {
  let component: CatalogoConsultaComponent;
  let fixture: ComponentFixture<CatalogoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
