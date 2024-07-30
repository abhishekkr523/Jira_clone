import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { SprintComponent } from '../sprint.component';

@Component({
  selector: 'app-edit-pop-up',
  templateUrl: './edit-pop-up.component.html',
  styleUrl: './edit-pop-up.component.css'
})
export class EditPopUpComponent {
  // private dialogRef: MatDialogRef<SprintComponent> | null = null;
constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<SprintComponent>){}
  editDialog(): void {
 
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width:'700px',
      height:'650px',
  
    });
    if (this.dialogRef) {
      this.dialogRef.close();
    }
   
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log('Form data:', result);
        });
      }
      deletedialog(): void {
 
        const dialogRef = this.dialog.open(DeletedialogComponent, {
          width:'600px',
          height:'200px',
      
        });
           // Close the currently open dialog, if any
           if (this.dialogRef) {
            this.dialogRef.close();
          }
         
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              console.log('Form data:', result);
            });
          }
}
