import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerOrdersComponent } from './wholesaler-orders.component';

describe('WholesalerOrdersComponent', () => {
  let component: WholesalerOrdersComponent;
  let fixture: ComponentFixture<WholesalerOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
