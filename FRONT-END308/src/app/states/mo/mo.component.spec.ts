import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoComponent } from './mo.component';

describe('MoComponent', () => {
  let component: MoComponent;
  let fixture: ComponentFixture<MoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
