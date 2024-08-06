import { MatDialog } from '@angular/material/dialog';
import { CreateProPopupComponent } from '../create-project/create-pro-popup/create-pro-popup.component';
import { DataServiceService } from '../../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectList } from '../../../user.interface';
import { ToastrService } from 'ngx-toastr';
import {  MatDialogRef } from '@angular/material/dialog';
import { LogoutPopUpComponent } from './logout-pop-up/logout-pop-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})


export class HeaderComponent implements OnInit {

  activeLink: HTMLElement | null = null;

  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];


  constructor(private projectService: DataServiceService,
    private toster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // this.selectProject(this.importantProjects[0]);
    this.projectService.projectsSubject.subscribe((projects: Project[]) => {
      this.Normalprojects = projects;
    });

    this.projectService.importantProjectsSubject.subscribe((importantProjects: Project[]) => {
      this.importantProjects = importantProjects;
    });
  }

  openDialog(): void {
    // this.serv.isVisible.next(true)
    const dialogRef = this.dialog.open(CreateProPopupComponent, {
      width: '1100px',
      height: '650px',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: { name: '', email: '' }
    });
    // this.serv.isVisible.next(true)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Form data:', result);
    });

   


    // selectProjectData : any= [...this.Normalprojects,...this.importantProjects]

  }



  // logout

  logOut() {
    this.dialog.open(LogoutPopUpComponent, {
      width: '250px'
    });
    
  }
  setActive(event: Event) {
    if (this.activeLink) {
      this.activeLink.classList.remove('active-link');
      // this.activeLink = null;
    }
    const target = (this.activeLink = event.target as HTMLElement);
    target.classList.add('active-link');
    this.activeLink = target;
  }
  
    // select project 
    selectProject(project: Project)
    {
      this.projectService.selectedProjectSubject.next(project);
      //  console.log('bahubali',project)
      this.toster.success('Project Selected')
      localStorage.setItem('selectedProject', JSON.stringify(project));

    }
}



