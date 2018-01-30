import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnComponent } from './tn.component';

describe('TnComponent', () => {
  let component: TnComponent;
  let fixture: ComponentFixture<TnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
