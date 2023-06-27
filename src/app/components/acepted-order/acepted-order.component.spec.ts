import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptedOrderComponent } from './acepted-order.component';

describe('AceptedOrderComponent', () => {
  let component: AceptedOrderComponent;
  let fixture: ComponentFixture<AceptedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
