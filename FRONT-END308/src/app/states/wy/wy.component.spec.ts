import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WyComponent } from './wy.component';

describe('WyComponent', () => {
  let component: WyComponent;
  let fixture: ComponentFixture<WyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
