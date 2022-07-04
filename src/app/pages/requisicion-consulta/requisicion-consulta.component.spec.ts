import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionConsultaComponent } from './requisicion-consulta.component';

describe('RequisicionConsultaComponent', () => {
  let component: RequisicionConsultaComponent;
  let fixture: ComponentFixture<RequisicionConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicionConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
