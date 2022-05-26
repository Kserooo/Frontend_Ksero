import { TestBed } from '@angular/core/testing';

import { WholesalerGuard } from './wholesaler.guard';

describe('WholesalerGuardGuard', () => {
  let guard: WholesalerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WholesalerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
