import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerShoppingCarComponent } from './retail-seller-shopping-car.component';

describe('RetailSellerShoppingCarComponent', () => {
  let component: RetailSellerShoppingCarComponent;
  let fixture: ComponentFixture<RetailSellerShoppingCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerShoppingCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerShoppingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
