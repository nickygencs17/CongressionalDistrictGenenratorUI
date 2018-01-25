import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsComponent } from './ms.component';

describe('MsComponent', () => {
  let component: MsComponent;
  let fixture: ComponentFixture<MsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
