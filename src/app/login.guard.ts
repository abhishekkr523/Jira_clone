import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // const loginData = localStorage.getItem('userLogin');

  if (!localStorage.getItem('userLogin')) {
   
      // router.navigate(['/dashboard']); 
    
    return true; 
  } else {
    router.navigate(['/dashboard']);
    return false;
  }
};
