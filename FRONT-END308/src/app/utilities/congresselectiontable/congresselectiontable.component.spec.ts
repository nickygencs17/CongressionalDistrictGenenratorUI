import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongresselectiontableComponent } from './congresselectiontable.component';

describe('CongresselectiontableComponent', () => {
  let component: CongresselectiontableComponent;
  let fixture: ComponentFixture<CongresselectiontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongresselectiontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongresselectiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
