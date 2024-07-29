import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDialogComponent } from './userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { BoardComponent } from './pages/board/board.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
// import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';


const routes: Routes = [
  { path: '', component: UserLoginComponent },
  {
    path: 'popup',
    component: PopupDialogComponent,
  },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'template', component: ChooseTempletComponent },
  {
    path:'backlog',
    component:BacklogComponent
  },
  {path:"board", component:BoardComponent},
  {path:"taskDetails", component:TaskDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
