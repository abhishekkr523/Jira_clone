import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../service/data-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  constructor(private router: Router , private toast:ToastrService) {}
  email: string = '';
  onSubmit(emailForm: any) {
    if (emailForm.valid) {
      localStorage.setItem('userLogin',JSON.stringify([{email : emailForm.value.email}]));
      this.toast.success('Successfully Login ');
      this.router.navigate(['/template']);
    } else {
     
      this.toast.error('Invalid email ');
    }
  }
}
