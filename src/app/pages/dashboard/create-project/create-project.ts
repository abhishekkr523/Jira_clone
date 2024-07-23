import { Component } from '@angular/core';
import { CreateProPopupComponent } from './create-pro-popup/create-pro-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-project.html',

})
export class CreateProject {
constructor(private dialog: MatDialog){}
    openDialog(): void {
        const dialogRef = this.dialog.open(CreateProPopupComponent, {
          width: '1100px',
          height: '650px',
          maxWidth:'none',
          panelClass: 'custom-dialog-container',
          data: { name: '', email: '' }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log('Form data:', result);
        });
      }
}
