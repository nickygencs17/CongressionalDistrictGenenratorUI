import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlComponent } from './il.component';

describe('IlComponent', () => {
  let component: IlComponent;
  let fixture: ComponentFixture<IlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
