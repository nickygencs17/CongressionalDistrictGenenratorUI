import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzComponent } from './az.component';

describe('AzComponent', () => {
  let component: AzComponent;
  let fixture: ComponentFixture<AzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
