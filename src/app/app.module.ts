import { NgModule } from '@angular/core';
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
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { SidebarComponent } from './pages/dashboard/sidebar/sidebar.component';
import { CreateProjectComponent } from './pages/dashboard/project/create-project/create-project.component';
import { AllProjectNameComponent } from './pages/dashboard/project/all-project-name/all-project-name.component';
import { SmallPopUpComponent } from './pages/dashboard/project/all-project-name/small-pop-up/small-pop-up.component';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { HotToastModule } from '@ngneat/hot-toast';
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
    AllProjectNameComponent,
    SmallPopUpComponent,
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
    ToastrModule.forRoot(),
   
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    // provideHotToastConfig({
    //   reverseOrder: true,
    //   dismissible: true,
    //   autoClose: false,
    // })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
