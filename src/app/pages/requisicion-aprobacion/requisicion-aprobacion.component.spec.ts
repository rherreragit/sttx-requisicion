import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionAprobacionComponent } from './requisicion-aprobacion.component';

describe('RequisicionAprobacionComponent', () => {
  let component: RequisicionAprobacionComponent;
  let fixture: ComponentFixture<RequisicionAprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicionAprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionAprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
