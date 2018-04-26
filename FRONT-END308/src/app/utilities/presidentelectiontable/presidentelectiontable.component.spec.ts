import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PresidentelectiontableComponent} from './presidentelectiontable.component';

describe('PresidentelectiontableComponent', () => {
  let component: PresidentelectiontableComponent;
  let fixture: ComponentFixture<PresidentelectiontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresidentelectiontableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentelectiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
