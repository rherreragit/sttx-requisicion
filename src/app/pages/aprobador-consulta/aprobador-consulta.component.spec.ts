import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobadorConsultaComponent } from './aprobador-consulta.component';

describe('AprobadorConsultaComponent', () => {
  let component: AprobadorConsultaComponent;
  let fixture: ComponentFixture<AprobadorConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobadorConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobadorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
