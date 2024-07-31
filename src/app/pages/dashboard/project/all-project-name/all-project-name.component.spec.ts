import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectNameComponent } from './all-project-name.component';

describe('AllProjectNameComponent', () => {
  let component: AllProjectNameComponent;
  let fixture: ComponentFixture<AllProjectNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProjectNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
