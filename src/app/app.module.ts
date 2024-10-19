import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';
// import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupDialogComponent } from './userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { CreateProjectComponent } from './pages/dashboard/project/create-project/create-project.component';
import { CommonModule } from '@angular/common';
import { CreateProPopupComponent } from './pages/dashboard/create-project/create-pro-popup/create-pro-popup.component';
import { CreateProjectModule } from './pages/dashboard/create-project/create-project.module';
import {QuillModule} from 'ngx-quill';
import { SprintComponent } from './pages/dashboard/sprint/sprint.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { CompletePopUpComponent } from './pages/dashboard/sprint/complete-pop-up/complete-pop-up.component';
// import { EditPopUpComponent } from './pages/dashboard/sprint/edit-pop-up/edit-pop-up.component';
import { EditdialogComponent } from './pages/dashboard/sprint/editdialog/editdialog.component';
import { DeletedialogComponent } from './pages/dashboard/sprint/deletedialog/deletedialog.component';
import { AllProjectNameComponent } from './pages/dashboard/project/all-project-name/all-project-name.component';
import { SmallPopUpComponent } from './pages/dashboard/project/all-project-name/small-pop-up/small-pop-up.component';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { HotToastModule } from '@ngneat/hot-toast';
import { BacklogComponent } from './pages/backlog/backlog.component';
import { BoardComponent } from './pages/board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InitialPipe } from './initial.pipe';
import { MatSelectModule } from '@angular/material/select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
// import {MatButtonModule} from '@angular/material/button';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatButtonModule} from '@angular/material/button';
// import {MatIconModule} from '@angular/material/icon';
import { NewInitialPipe } from './pages/dashboard/project/all-project-name/new-initial.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TaskDetailsComponent } from './pages/board/task-details/task-details.component';
import { AddPeopleDialogComponent } from './pages/board/add-people-dialog/add-people-dialog.component';
import { EditBacklogComponent } from './pages/dashboard/sprint/edit-backlog/edit-backlog.component';
import { DeleteBacklogComponent } from './pages/dashboard/sprint/delete-backlog/delete-backlog.component';
import { LogoutPopUpComponent } from './pages/dashboard/header/logout-pop-up/logout-pop-up.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Error404Component } from './pages/error-404/error-404.component';
import { AllTrashProjectComponent } from './pages/dashboard/project/all-trash-project/all-trash-project.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ChooseTempletComponent,
    // WelcomePageComponent,
    DashboardComponent,
    PopupDialogComponent,
    HeaderComponent,
    SidebarComponent,
    CreateProjectComponent,
    SprintComponent,
    CompletePopUpComponent,
    // EditPopUpComponent,
    EditdialogComponent,
    DeletedialogComponent,
    AllProjectNameComponent,
    SmallPopUpComponent,
    BacklogComponent,
    BoardComponent,
    InitialPipe,
    NewInitialPipe,
    TaskDetailsComponent,
    NewInitialPipe,
    AddPeopleDialogComponent,
    EditBacklogComponent,
    DeleteBacklogComponent,
    LogoutPopUpComponent,
    Error404Component,
    AllTrashProjectComponent,
    BreadcrumbComponent,
  
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    FontAwesomeModule,CommonModule,CreateProjectModule,QuillModule.forRoot(),NgSelectModule,BrowserAnimationsModule,
    DragDropModule,
    MatSelectModule,SelectDropDownModule,
    MatIconModule,
    MatMenuModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatTooltipModule,ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    MatAutocompleteModule,
    MatFormFieldModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter()
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
 }