import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlComponent } from './al.component';

describe('AlComponent', () => {
  let component: AlComponent;
  let fixture: ComponentFixture<AlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
