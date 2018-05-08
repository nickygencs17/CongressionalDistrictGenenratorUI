import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedistrictComponent } from './redistrict.component';

describe('RedistrictComponent', () => {
  let component: RedistrictComponent;
  let fixture: ComponentFixture<RedistrictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedistrictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
