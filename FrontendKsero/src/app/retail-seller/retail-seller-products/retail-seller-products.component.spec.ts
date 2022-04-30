import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerProductsComponent } from './retail-seller-products.component';

describe('RetailSellerProductsComponent', () => {
  let component: RetailSellerProductsComponent;
  let fixture: ComponentFixture<RetailSellerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
