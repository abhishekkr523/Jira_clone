import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProPopupComponent } from './create-pro-popup.component';

describe('CreateProPopupComponent', () => {
  let component: CreateProPopupComponent;
  let fixture: ComponentFixture<CreateProPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
