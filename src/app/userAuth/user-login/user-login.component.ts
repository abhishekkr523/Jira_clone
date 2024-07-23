import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  email!: string;

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.email === 'user@gmail.com') {
      this.router.navigate(['/template']);
    } else {
      alert('Invalid email address');
    }
  }
}
