import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.css'
})
export class EditdialogComponent {
  weeks = [1, 2, 3, 4];
  selectedWeeks: number | string = 1;
  customWeeks: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  constructor(private dialogRef:MatDialogRef<EditdialogComponent>){}
  calculateEndDate(): void {
    if (!this.startDate) {
      this.endDate = null;
      return;
    }

    let weeksToAdd = this.selectedWeeks === 'custom' && this.customWeeks ? this.customWeeks : this.selectedWeeks;

    if (typeof weeksToAdd === 'number' && weeksToAdd > 0) {
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + weeksToAdd * 7);
    } else {
      this.endDate = null;
    }
  }
  cancel(){
    if(this.dialogRef){
      this.dialogRef.close()

    }
  
  }
}
