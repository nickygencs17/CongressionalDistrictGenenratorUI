import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeComponent } from './ne.component';

describe('NeComponent', () => {
  let component: NeComponent;
  let fixture: ComponentFixture<NeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
