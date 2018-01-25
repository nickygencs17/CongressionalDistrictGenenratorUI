import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WvComponent } from './wv.component';

describe('WvComponent', () => {
  let component: WvComponent;
  let fixture: ComponentFixture<WvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
