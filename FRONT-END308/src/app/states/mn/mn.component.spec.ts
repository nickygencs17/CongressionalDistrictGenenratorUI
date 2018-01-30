import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnComponent } from './mn.component';

describe('MnComponent', () => {
  let component: MnComponent;
  let fixture: ComponentFixture<MnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
