import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-small-pop-up',
  templateUrl: './small-pop-up.component.html',
  styleUrl: './small-pop-up.component.scss'
})
export class SmallPopUpComponent {

  constructor(
   
    private dialogRef: MatDialogRef<SmallPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService:ToastrService
   
  ) {
   
  }
  onCancel(): void {
    this.dialogRef.close();
     this.toastService.error('Project Not deleted');
  }

 
 
  onSubmit(): void {
   
    this.dialogRef.close('delete');
    this.toastService.success('Project successfully Move To Trash');

     
      
    
  }

}
