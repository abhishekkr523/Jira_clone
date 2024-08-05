import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBacklogComponent } from './delete-backlog.component';

describe('DeleteBacklogComponent', () => {
  let component: DeleteBacklogComponent;
  let fixture: ComponentFixture<DeleteBacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBacklogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
