import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSellerProfileComponent } from './retail-seller-profile.component';

describe('RetailSellerProfileComponent', () => {
  let component: RetailSellerProfileComponent;
  let fixture: ComponentFixture<RetailSellerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSellerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSellerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
