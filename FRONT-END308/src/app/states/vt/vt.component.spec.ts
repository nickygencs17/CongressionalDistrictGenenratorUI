import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtComponent } from './vt.component';

describe('VtComponent', () => {
  let component: VtComponent;
  let fixture: ComponentFixture<VtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
