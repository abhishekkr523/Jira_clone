import { NgModule } from '@angular/core';
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
import { BacklogComponent } from './pages/backlog/backlog.component';
import { BoardComponent } from './pages/board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { InitialPipe } from './initial.pipe';
import { MatSelectModule } from '@angular/material/select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
// import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ChooseTempletComponent,
    // WelcomePageComponent,
    DashboardComponent,
    PopupDialogComponent,
    BacklogComponent,
    BoardComponent,
    InitialPipe,
    TaskDetailsComponent
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
    DragDropModule,
    MatSelectModule,SelectDropDownModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
