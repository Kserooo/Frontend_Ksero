import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerOrdersComponent } from './retail-seller-orders.component';

describe('RetailSellerOrdersComponent', () => {
  let component: RetailSellerOrdersComponent;
  let fixture: ComponentFixture<RetailSellerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
