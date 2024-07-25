import { Component } from '@angular/core';
import { CreateProPopupComponent } from './create-pro-popup/create-pro-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './create-project.html',

})
export class CreateProject {
constructor(private dialog: MatDialog){}
   
      
}
