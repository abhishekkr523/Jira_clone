import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent  implements OnInit{
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Automatically click the button after 3 seconds
    setTimeout(() => this.openDialog(), 3000);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
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
