import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faCircleExclamation, faStop } from '@fortawesome/free-solid-svg-icons';
import { EditdialogComponent } from '../editdialog/editdialog.component';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrl: './deletedialog.component.css'
})
export class DeletedialogComponent {
danger=faCircleExclamation
// private dialogRef?: MatDialogRef<DeletedialogComponent> ;
constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<DeletedialogComponent>){}
cancel(){
  if(this.dialogRef){
    this.dialogRef.close()

  }

}
}
