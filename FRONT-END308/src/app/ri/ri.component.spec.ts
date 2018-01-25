import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiComponent } from './ri.component';

describe('RiComponent', () => {
  let component: RiComponent;
  let fixture: ComponentFixture<RiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
