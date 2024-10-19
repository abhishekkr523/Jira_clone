import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupDialogComponent } from './userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';
import { CreateProPopupComponent } from './pages/dashboard/create-project/create-pro-popup/create-pro-popup.component';
import { CreateProject } from './pages/dashboard/create-project/create-project';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProjectComponent } from './pages/dashboard/project/create-project/create-project.component';
// import { SprintComponent } from './pages/dashboard/sprint/sprint.component';
import { AllProjectNameComponent } from './pages/dashboard/project/all-project-name/all-project-name.component';
import { BoardComponent } from './pages/board/board.component';
import { TaskDetailsComponent } from './pages/board/task-details/task-details.component';
import { AddPeopleDialogComponent } from './pages/board/add-people-dialog/add-people-dialog.component';
import { authGuard } from './auth.guard';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { loginGuard } from './login.guard';
import { Error404Component } from './pages/error-404/error-404.component';
import { SprintComponent } from './pages/dashboard/sprint/sprint.component';
import { AllTrashProjectComponent } from './pages/dashboard/project/all-trash-project/all-trash-project.component';
// import { TaskDetailsComponent } from './pages/task-details/task-details.component';
// import { TaskDetailsComponent } from './pages/task-details/task-details.component';

// import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent,canActivate:[loginGuard] },

  {
    path: 'popup',
    component: PopupDialogComponent,canActivate: [authGuard],
  },
  { path: 'template', component: ChooseTempletComponent ,canActivate: [authGuard],},
  {
    path: 'create',
    component: CreateProject,
    children: [{ path: '', component: CreateProPopupComponent,canActivate: [authGuard], }],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' }, // This makes /dashboard redirect to /dashboard/board
      { path: 'board', component: BoardComponent, canActivate: [authGuard] },
      {
        path: 'backlog',
        component:BacklogComponent,
        canActivate: [authGuard],
      },
      {
        path: 'sprint',
        component: SprintComponent,
      },
    ],
  },
  {
    path: 'create-project',
    component: CreateProjectComponent,
  },
  {
    path: 'showAllProjects',
    component: AllProjectNameComponent,
  },{
path:'allTrashProjects',
component:AllTrashProjectComponent
  },
  { path: 'taskDetails', component: TaskDetailsComponent },
  { path: 'addPeople', component: AddPeopleDialogComponent },
  {path:"error",component:Error404Component},
  // { path: '**', redirectTo: '/error' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
