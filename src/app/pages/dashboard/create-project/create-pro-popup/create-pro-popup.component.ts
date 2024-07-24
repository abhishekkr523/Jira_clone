import { Component } from '@angular/core';
import { faCancel, faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css'
})
export class CreateProPopupComponent {
  cancel=faCancel
  coffie=faCoffee
  imageUrl: string|undefined
  formData = {
    name: '',
    email: '',
    country: ''
  };
  Option = ['In progress', 'Done', 'Ready to deploy'];
faCoffee: any;

  onSubmit(){}
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if(file){
      const reader:FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string
        
        // console.log("ImageUrl",this.imageUrl)
      };
    }
    }
}
