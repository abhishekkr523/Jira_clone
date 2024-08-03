import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPopUpComponent } from './small-pop-up.component';

describe('SmallPopUpComponent', () => {
  let component: SmallPopUpComponent;
  let fixture: ComponentFixture<SmallPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
