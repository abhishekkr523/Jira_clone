import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../../../service/data-service.service';

@Component({
  selector: 'app-logout-pop-up',
  templateUrl: './logout-pop-up.component.html',
  styleUrl: './logout-pop-up.component.css'
})
export class LogoutPopUpComponent {

  constructor(
    private dialogRef: MatDialogRef<LogoutPopUpComponent>,
    private router: Router,
    private toast:ToastrService,
    private dataService: DataServiceService
  ) {}


  
  onLogout() {
   // Remove all relevant local storage items
   localStorage.removeItem('userLogin');
   localStorage.removeItem('selectedProject');
   localStorage.removeItem('importantProjects');
   localStorage.removeItem('projects');
   // Add more items if needed
    this.dialogRef.close();

    this.router.navigate(['/user-login']);

    this.toast.success('Successfully Logout ');
    // this.dataService.updateProjects(this.projects);
    //     this.dataService.updateImportantProjects(this.importantProjects);
  }

  onCancel() {
    this.dialogRef.close();
    this.toast.error('Not Logout');
  }

}
