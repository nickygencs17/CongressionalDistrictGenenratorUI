import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyComponent } from './ky.component';

describe('KyComponent', () => {
  let component: KyComponent;
  let fixture: ComponentFixture<KyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
