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

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full', data: { breadcrumb: 'Login' } },
  { path: 'user-login', component: UserLoginComponent, canActivate: [loginGuard], data: { breadcrumb: 'User Login' } },
  {
    path: 'popup',
    component: PopupDialogComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Popup' },
  },
  {
    path: 'template',
    component: ChooseTempletComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Choose Template' },
  },
  {
    path: 'create',
    component: CreateProject,
    children: [
      {
        path: '',
        component: CreateProPopupComponent,
        canActivate: [authGuard],
        data: { breadcrumb: 'Create Project' },
      },
    ],
    data: { breadcrumb: 'Create' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Dashboard' },
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      { path: 'board', component: BoardComponent, canActivate: [authGuard], data: { breadcrumb: 'Board' } },
      {
        path: 'backlog',
        component: BacklogComponent,
        canActivate: [authGuard],
        data: { breadcrumb: 'Backlog' },
      },
      {
        path: 'sprint',
        component: SprintComponent,
        data: { breadcrumb: 'Sprint' },
      },
    ],
  },
  {
    path: 'create-project',
    component: CreateProjectComponent,
    data: { breadcrumb: 'Create Project' },
  },
  {
    path: 'showAllProjects',
    component: AllProjectNameComponent,
    data: { breadcrumb: 'All Projects' },
  },
  {
    path: 'allTrashProjects',
    component: AllTrashProjectComponent,
    data: { breadcrumb: 'Trash Projects' },
  },
  { path: 'taskDetails', component: TaskDetailsComponent, data: { breadcrumb: 'Task Details' } },
  { path: 'addPeople', component: AddPeopleDialogComponent, data: { breadcrumb: 'Add People' } },
  { path: 'error', component: Error404Component, data: { breadcrumb: 'Error 404' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
