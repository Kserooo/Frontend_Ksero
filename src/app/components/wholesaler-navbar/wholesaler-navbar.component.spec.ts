import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerNavbarComponent } from './wholesaler-navbar.component';

describe('WholesalerNavbarComponent', () => {
  let component: WholesalerNavbarComponent;
  let fixture: ComponentFixture<WholesalerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
