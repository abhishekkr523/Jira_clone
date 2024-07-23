import { Component } from '@angular/core';

@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css'
})
export class CreateProPopupComponent {
  formData = {
    name: '',
    email: '',
    country: ''
  };
  Option = ['In progress', 'Done', 'Ready to deploy'];

  onSubmit(){}
}
