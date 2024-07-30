import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDialogComponent } from './userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';
import { CreateProPopupComponent } from './pages/dashboard/create-project/create-pro-popup/create-pro-popup.component';
import { CreateProject } from './pages/dashboard/create-project/create-project';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProjectComponent } from './pages/dashboard/project/create-project/create-project.component';
import { SprintComponent } from './pages/dashboard/sprint/sprint.component';
// import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'popup',
    component: PopupDialogComponent,
  },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'template', component: ChooseTempletComponent },
  {path:'create',component:CreateProject,children:[
    {path:'',component:CreateProPopupComponent}
  ]},
  {
    path:'dashboard',
    component:DashboardComponent
   },
  {
    path:'sprint',
    component:SprintComponent
   },
 
  // {
  //   path:'welcomePage',
  //   component:WelcomePageComponent
  // }
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'create-project',
    component:CreateProjectComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
