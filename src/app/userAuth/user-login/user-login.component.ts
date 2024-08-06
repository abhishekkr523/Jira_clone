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
  // email!: string;

  constructor(private router: Router , private toast:ToastrService,private srv:DataServiceService ) {}

  email: string = '';

  onSubmit(emailForm: any) {
    if (emailForm.valid) {
      localStorage.setItem('userLogin', this.email);
    
      this.toast.success('Successfully Login ');
      this.router.navigate(['/template']);
      console.log("before",this.srv.isLoggedin.value)
      this.srv.isLoggedin.next(true);
      console.log("after",this.srv.isLoggedin.value)
    } else {
     
      this.toast.success('Invalid email ');
    }
  }
}
