import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDialogComponent } from './userAuth/welcome-page/popup-dialog/popup-dialog.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path:'popup',
    component:PopupDialogComponent,
    
  },
  {path:"user-login", component:UserLoginComponent},
  {
    path:'welcomePage',
    component :WelcomePageComponent
  }


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
