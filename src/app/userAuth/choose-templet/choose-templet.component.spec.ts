import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTempletComponent } from './choose-templet.component';

describe('ChooseTempletComponent', () => {
  let component: ChooseTempletComponent;
  let fixture: ComponentFixture<ChooseTempletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseTempletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
