
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mapd3Component } from './mapd3.component';

describe('Mapd3Component', () => {
  let component: Mapd3Component;
  let fixture: ComponentFixture<Mapd3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mapd3Component ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mapd3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
