import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaComponent } from './va.component';

describe('VaComponent', () => {
  let component: VaComponent;
  let fixture: ComponentFixture<VaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
