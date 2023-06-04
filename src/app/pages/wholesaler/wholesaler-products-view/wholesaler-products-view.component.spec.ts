import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerProductViewComponent } from './wholesaler-products-view.component';

describe('WholesalerProductViewComponent', () => {
  let component: WholesalerProductViewComponent;
  let fixture: ComponentFixture<WholesalerProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerProductViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
