import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WiComponent } from './wi.component';

describe('WiComponent', () => {
  let component: WiComponent;
  let fixture: ComponentFixture<WiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
