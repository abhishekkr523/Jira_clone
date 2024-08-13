import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrashProjectComponent } from './all-trash-project.component';

describe('AllTrashProjectComponent', () => {
  let component: AllTrashProjectComponent;
  let fixture: ComponentFixture<AllTrashProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTrashProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTrashProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
