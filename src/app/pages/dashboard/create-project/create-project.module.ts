import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProPopupComponent } from './create-pro-popup/create-pro-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select'
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    CreateProPopupComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,
    MatInputModule,MatSelectModule,
    MatDialogModule,NgSelectModule,QuillModule
    
  ]
})
export class CreateProjectModule { }
