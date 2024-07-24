import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './userAuth/user-login/user-login.component';
import { ChooseTempletComponent } from './userAuth/choose-templet/choose-templet.component';
// import { WelcomePageComponent } from './userAuth/welcome-page/welcome-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog'
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

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ChooseTempletComponent,
    // WelcomePageComponent,
    DashboardComponent,
    PopupDialogComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration(),
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
 }
