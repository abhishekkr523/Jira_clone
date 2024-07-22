import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDialogComponent } from './userAuth/welcome-page/popup-dialog/popup-dialog.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';

const routes: Routes = [
  {path:"", component:UserLoginComponent},
  {
    path:'popup',
    component:PopupDialogComponent,
    
  },
  {path:"user-login", component:UserLoginComponent},
  {path: "template", component: ChooseTempletComponent}


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
