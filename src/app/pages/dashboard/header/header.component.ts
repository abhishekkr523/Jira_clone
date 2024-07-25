import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProPopupComponent } from '../create-project/create-pro-popup/create-pro-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog:MatDialog){}
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
