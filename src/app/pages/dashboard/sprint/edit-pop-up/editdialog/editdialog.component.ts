import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.css'
})
export class EditdialogComponent implements OnInit {
  weeks = [1, 2, 3, 4];
  selectedWeeks: number | string = 1;
  customWeeks: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  registerProject!:FormGroup
  constructor(private dialogRef:MatDialogRef<EditdialogComponent>,private fb:FormBuilder){}
  ngOnInit(): void {
    this.registerProject = this.fb.group({
      sprintName: ['',[Validators.required]],
      startDate: ['', [Validators.required]],
      duration: ['', ],
      endDate: ['', ],
      summary: ['', ],
    });
  }
  calculateEndDate(): void {
    if (!this.startDate) {
      this.endDate = null;
      return;
    }

    let weeksToAdd = this.selectedWeeks === 'custom' && this.customWeeks ? this.customWeeks : this.selectedWeeks;
    if (typeof weeksToAdd === 'number' && weeksToAdd > 0) {
      console.log(typeof weeksToAdd)
      console.log(weeksToAdd)
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + weeksToAdd * 7);
      console.log(this.endDate)
    } else {
      this.endDate = null;
    }
  }
  onCustomWeeksChange() {
    if (this.selectedWeeks === 'custom') {
      this.calculateEndDate();
      
    }
  }

  onWeeksChange() {
    this.calculateEndDate();
  }
  cancel(){
    if(this.dialogRef){
      this.dialogRef.close()

    }
  
  }
}
