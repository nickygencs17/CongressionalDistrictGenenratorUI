import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcComponent } from './nc.component';

describe('NcComponent', () => {
  let component: NcComponent;
  let fixture: ComponentFixture<NcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
