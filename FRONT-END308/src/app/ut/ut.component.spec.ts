import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtComponent } from './ut.component';

describe('UtComponent', () => {
  let component: UtComponent;
  let fixture: ComponentFixture<UtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
