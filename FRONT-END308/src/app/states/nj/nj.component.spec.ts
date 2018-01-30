import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NjComponent } from './nj.component';

describe('NjComponent', () => {
  let component: NjComponent;
  let fixture: ComponentFixture<NjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
