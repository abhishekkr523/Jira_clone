import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePopUpComponent } from './complete-pop-up.component';

describe('CompletePopUpComponent', () => {
  let component: CompletePopUpComponent;
  let fixture: ComponentFixture<CompletePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletePopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
