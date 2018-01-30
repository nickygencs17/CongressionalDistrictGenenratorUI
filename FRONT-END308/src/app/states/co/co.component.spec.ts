import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoComponent } from './co.component';

describe('CoComponent', () => {
  let component: CoComponent;
  let fixture: ComponentFixture<CoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
