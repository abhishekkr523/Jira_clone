import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCancel, faListDots, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CompletePopUpComponent } from './complete-pop-up/complete-pop-up.component';
import { EditPopUpComponent } from './edit-pop-up/edit-pop-up.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
searchIcon=faSearch
cancel=faCancel
horizontal=faListDots
options = [
  { value: 'option1', label: 'Option 1', icon: 'fas fa-home' },
  { value: 'option2', label: 'Option 2', icon: 'fas fa-user' },
  { value: 'option3', label: 'Option 3', icon: 'fas fa-cog' }
];
constructor(private dialog:MatDialog){}
openDialog(): void {
 
  const dialogRef = this.dialog.open(CompletePopUpComponent, {
    width:'700px',
    height:'400px',

  });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log('Form data:', result);
      });
    }
openDialog2(): void {
  const dialogConfig=new MatDialogConfig()
  
  // dialogConfig.width = '30px'; // Set the width of the modal
  dialogConfig.height = '60px'; // Set the height of the modal
  dialogConfig.position = {
    top: '210px',
    right: '50px',
  };
  dialogConfig.data = {
    title: 'Modal Title',
    content: 'This is the content of the modal.'
  };
  const dialogRef = this.dialog.open(EditPopUpComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log('Form data:', result);
      });
    }
}
