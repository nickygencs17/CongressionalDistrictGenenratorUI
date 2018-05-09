import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSavedRedistrictComponent } from './all-saved-redistrict.component';

describe('AllSavedRedistrictComponent', () => {
  let component: AllSavedRedistrictComponent;
  let fixture: ComponentFixture<AllSavedRedistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSavedRedistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSavedRedistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
