import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerProductsComponent } from './wholesaler-products.component';

describe('WholesalerProductsComponent', () => {
  let component: WholesalerProductsComponent;
  let fixture: ComponentFixture<WholesalerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
