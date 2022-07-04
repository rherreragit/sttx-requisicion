import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAltaComponent } from './catalogo-alta.component';

describe('CatalogoAltaComponent', () => {
  let component: CatalogoAltaComponent;
  let fixture: ComponentFixture<CatalogoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
