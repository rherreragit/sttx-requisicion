import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionOcComponent } from './requisicion-oc.component';

describe('RequisicionOcComponent', () => {
  let component: RequisicionOcComponent;
  let fixture: ComponentFixture<RequisicionOcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisicionOcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
