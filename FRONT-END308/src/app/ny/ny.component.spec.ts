import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyComponent } from './ny.component';

describe('NyComponent', () => {
  let component: NyComponent;
  let fixture: ComponentFixture<NyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
