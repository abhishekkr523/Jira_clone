import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrl: './popup-dialog.component.css',
})
export class PopupDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private service:DataServiceService
  ) {
    this.form = this.fb.group({
      // name: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

 
  projectName:any
  onSubmit(): void {
   
      this.dialogRef.close(this.projectName);
     
      // this.service.projectNameSubject.next(this.projectName);
      console.log('valid',this.projectName);
      this.router.navigate(['dashboard']);
    
  }
}
