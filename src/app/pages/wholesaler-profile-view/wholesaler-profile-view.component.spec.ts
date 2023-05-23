import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerProfileViewComponent } from './wholesaler-profile-view.component';

describe('WholesalerProfileViewComponent', () => {
  let component: WholesalerProfileViewComponent;
  let fixture: ComponentFixture<WholesalerProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesalerProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
