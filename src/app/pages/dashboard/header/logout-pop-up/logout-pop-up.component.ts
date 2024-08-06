import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout-pop-up',
  templateUrl: './logout-pop-up.component.html',
  styleUrl: './logout-pop-up.component.css'
})
export class LogoutPopUpComponent {

  constructor(
    private dialogRef: MatDialogRef<LogoutPopUpComponent>,
    private router: Router,
    private toast:ToastrService
  ) {}


  
  onLogout() {
    localStorage.removeItem('userLogin');
    this.dialogRef.close();

    this.router.navigate(['/user-login']);

    this.toast.success('Successfully Logout ');
  }

  onCancel() {
    this.dialogRef.close();
    this.toast.error('Not Logout');
  }

}
