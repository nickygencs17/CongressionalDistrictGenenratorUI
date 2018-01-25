import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaComponent } from './la.component';

describe('LaComponent', () => {
  let component: LaComponent;
  let fixture: ComponentFixture<LaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
