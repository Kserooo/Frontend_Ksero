import { TestBed } from '@angular/core/testing';

import {RetailSellerOrdersService} from "./retail-seller-orders.service";

describe('RetailSellerOrdersService', () => {
  let service: RetailSellerOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailSellerOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
