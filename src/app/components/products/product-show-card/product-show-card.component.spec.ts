import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowCardComponent } from './product-show-card.component';

describe('ProductShowCardComponent', () => {
  let component: ProductShowCardComponent;
  let fixture: ComponentFixture<ProductShowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductShowCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
