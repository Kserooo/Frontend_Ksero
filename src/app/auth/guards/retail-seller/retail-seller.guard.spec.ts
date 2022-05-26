import { TestBed } from '@angular/core/testing';

import { RetailSellerGuard } from './retail-seller.guard';

describe('RetailSellerGuardGuard', () => {
  let guard: RetailSellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RetailSellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
