import { Component } from '@angular/core';
import { EditdialogComponent } from '../edit-pop-up/editdialog/editdialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SprintComponent } from '../sprint.component';
import { DeleteBacklogComponent } from '../delete-backlog/delete-backlog.component';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html',
  styleUrl: './edit-backlog.component.css'
})
export class EditBacklogComponent {
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
 
        const dialogRef = this.dialog.open(DeleteBacklogComponent, {
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
