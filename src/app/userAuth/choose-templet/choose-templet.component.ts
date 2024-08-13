import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-choose-templet',
  templateUrl: './choose-templet.component.html',
  styleUrl: './choose-templet.component.css'
})
export class ChooseTempletComponent {


  constructor(private router:Router,private dialog: MatDialog){}
  selectedBox: number | null = null;
  buttonVisible: boolean = false;

  selectBox(boxNumber: number): void {
    this.selectedBox = boxNumber;
    this.buttonVisible = true;
  }

//   goWelcomePage()
//   {
//  this.router.navigate(['welcomePage'])
//     console.log('welcome')
//   }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(PopupDialogComponent, {
  //     width: '1100px',
  //     height: '650px',
  //     maxWidth:'none',
  //     panelClass: 'custom-dialog-container',
  //     data: { name: '', email: '' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log('Form data:', result);
  //   });
  // }

  openDialog()
  {
   this.router.navigate(['/create-project'])
  }

}
