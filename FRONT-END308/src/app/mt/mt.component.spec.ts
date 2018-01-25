import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtComponent } from './mt.component';

describe('MtComponent', () => {
  let component: MtComponent;
  let fixture: ComponentFixture<MtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
