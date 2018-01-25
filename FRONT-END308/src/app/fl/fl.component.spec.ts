import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlComponent } from './fl.component';

describe('FlComponent', () => {
  let component: FlComponent;
  let fixture: ComponentFixture<FlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
