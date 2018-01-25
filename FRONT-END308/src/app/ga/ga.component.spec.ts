import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaComponent } from './ga.component';

describe('GaComponent', () => {
  let component: GaComponent;
  let fixture: ComponentFixture<GaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
