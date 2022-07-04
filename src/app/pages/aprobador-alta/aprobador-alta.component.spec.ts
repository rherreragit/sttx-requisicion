import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobadorAltaComponent } from './aprobador-alta.component';

describe('AprobadorAltaComponent', () => {
  let component: AprobadorAltaComponent;
  let fixture: ComponentFixture<AprobadorAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobadorAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobadorAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
