import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesaleProfileViewDialogUpdateComponent } from './wholesale-profile-view-dialog-update.component';

describe('WholesaleProfileViewDialogUpdateComponent', () => {
  let component: WholesaleProfileViewDialogUpdateComponent;
  let fixture: ComponentFixture<WholesaleProfileViewDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholesaleProfileViewDialogUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesaleProfileViewDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
