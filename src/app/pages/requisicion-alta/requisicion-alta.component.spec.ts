import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisicionAltaComponent } from './requisicion-alta.component';

describe('RequisicionAltaComponent', () => {
  let component: RequisicionAltaComponent;
  let fixture: ComponentFixture<RequisicionAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisicionAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisicionAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
