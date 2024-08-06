import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-complete-pop-up',
  templateUrl: './complete-pop-up.component.html',
  styleUrl: './complete-pop-up.component.css'
})
export class CompletePopUpComponent {
  constructor(private dialogRef:MatDialogRef<CompletePopUpComponent>){}
cancel(){
  if (this.dialogRef) {
    this.dialogRef.close();
  }
}
}
