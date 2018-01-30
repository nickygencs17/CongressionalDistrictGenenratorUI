import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiComponent } from './mi.component';

describe('MiComponent', () => {
  let component: MiComponent;
  let fixture: ComponentFixture<MiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
