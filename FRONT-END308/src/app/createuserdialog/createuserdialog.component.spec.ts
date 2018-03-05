import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserdialogComponent } from './createuserdialog.component';

describe('CreateuserdialogComponent', () => {
  let component: CreateuserdialogComponent;
  let fixture: ComponentFixture<CreateuserdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateuserdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
