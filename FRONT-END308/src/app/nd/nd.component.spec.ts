import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdComponent } from './nd.component';

describe('NdComponent', () => {
  let component: NdComponent;
  let fixture: ComponentFixture<NdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
