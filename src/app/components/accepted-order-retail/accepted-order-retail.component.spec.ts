import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedOrderRetailComponent } from './accepted-order-retail.component';

describe('AcceptedOrderRetailComponent', () => {
  let component: AcceptedOrderRetailComponent;
  let fixture: ComponentFixture<AcceptedOrderRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedOrderRetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedOrderRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
