import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OhComponent } from './oh.component';

describe('OhComponent', () => {
  let component: OhComponent;
  let fixture: ComponentFixture<OhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
