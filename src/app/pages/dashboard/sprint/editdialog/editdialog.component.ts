import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sprint } from '../../../../user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.css'
})
export class EditdialogComponent implements OnInit,AfterViewInit {
  weeks = [1, 2, 3, 4];
  selectedWeeks: number | Date|string = 1;
  customWeeks: number | null = null;
  startDate!: Date | number;
  endDate: Date | string = '';
  registerProject!: FormGroup;
  sprint: Sprint;

  constructor(
    private dialogRef: MatDialogRef<EditdialogComponent>,
    private fb: FormBuilder,
    private toast:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sprint = data.sprint;
  }

  ngOnInit(): void {
    this.registerProject = this.fb.group({
      sprintName: [this.sprint.sprintName, [Validators.required]],
      startDate: ['', [Validators.required]],
      customWeeks: [this.sprint.startDate, [Validators.required]],
      duration: [this.sprint.duration, [Validators.required]],
      endDate: [this.sprint.endDate, [Validators.required]],
      summary: [this.sprint.summary]
    });

    // this.selectedWeeks = this.sprint.duration;
    // this.startDate = this.sprint.startDate ? new Date(this.sprint.startDate) : null;
    this.calculateEndDate();
  }
  ngAfterViewInit(): void {
   
  }

  calculateEndDate(): void {
    if (!this.startDate) {
      this.endDate = 'Enter the starting date.';
      return;
    }

    let weeksToAdd = this.selectedWeeks === 'custom' && this.customWeeks ? this.customWeeks : this.selectedWeeks;
    if (typeof weeksToAdd === 'number' && weeksToAdd > 0) {
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + weeksToAdd * 7);
    } else {
      this.endDate = 'Enter the starting date.';
    }
  }

  onWeeksChange() {
    this.calculateEndDate();
  }

  onCustomWeeksChange() {
    if (this.selectedWeeks === 'custom') {
      this.calculateEndDate();
    }
  }


  // save data
  onSave(): void {
    if (this.registerProject.valid) {
      const updatedSprint = {
        ...this.sprint,
        ...this.registerProject.value,
        endDate: this.endDate
      };
      this.toast.success('Sprint Created successfully')
      this.dialogRef.close(updatedSprint);
     
    }
  }

  onCancel(): void {
    this.dialogRef.close();
   
  }
}
