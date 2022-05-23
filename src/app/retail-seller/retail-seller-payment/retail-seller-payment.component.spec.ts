import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerPaymentComponent } from './retail-seller-payment.component';

describe('RetailSellerPaymentComponent', () => {
  let component: RetailSellerPaymentComponent;
  let fixture: ComponentFixture<RetailSellerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
