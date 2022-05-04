import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerNavbarComponent } from './retail-seller-navbar.component';

describe('RetailSellerNavbarComponent', () => {
  let component: RetailSellerNavbarComponent;
  let fixture: ComponentFixture<RetailSellerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
