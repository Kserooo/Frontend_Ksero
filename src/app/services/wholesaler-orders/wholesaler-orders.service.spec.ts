import { TestBed } from '@angular/core/testing';

import {WholesalerOrdersService} from "./wholesaler-orders.service";

describe('OrdersService', () => {
  let service: WholesalerOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WholesalerOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
