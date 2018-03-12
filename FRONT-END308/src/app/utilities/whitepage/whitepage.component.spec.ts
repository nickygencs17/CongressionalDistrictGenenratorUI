import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhitepageComponent } from './whitepage.component';

describe('WhitepageComponent', () => {
  let component: WhitepageComponent;
  let fixture: ComponentFixture<WhitepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhitepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhitepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
