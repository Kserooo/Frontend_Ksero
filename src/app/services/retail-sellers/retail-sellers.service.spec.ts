import { TestBed } from '@angular/core/testing';

import {RetailSellersService} from "./retail-sellers.service";

describe('RetailSellersService', () => {
  let service: RetailSellersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailSellersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
