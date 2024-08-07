import { CanActivateFn, Router } from '@angular/router';
import { DataServiceService } from './service/data-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // const authService = inject(DataServiceService);
  const router = inject(Router);
  const user =localStorage.getItem('userLogin')

  if (!user) {
    router.navigate(['/user-login']);
    // console.log("in auth",authService.isLoggedin.value)
    return false; 
  } else {
     
    return true; 
  }
};
