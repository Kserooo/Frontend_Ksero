import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderRetailComponent } from './pending-order-retail.component';

describe('PendingOrderRetailComponent', () => {
  let component: PendingOrderRetailComponent;
  let fixture: ComponentFixture<PendingOrderRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrderRetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
