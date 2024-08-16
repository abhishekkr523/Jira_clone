import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faCircleExclamation, faStop } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
// import { EditdialogComponent } from '../../editdialog/editdialog.component';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrl: './deletedialog.component.css'
})
export class DeletedialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast:ToastrService
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
   
  }

  onCancel(): void {
    
    this.dialogRef.close(false);
    
  }
}
