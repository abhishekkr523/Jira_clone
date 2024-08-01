import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';
import { Project, ProjectList } from '../../../user.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutPopUpComponent } from './logout-pop-up/logout-pop-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  activeLink: HTMLElement | null = null;

  setActive(event: Event) {
    if (this.activeLink) {
      this.activeLink.classList.remove('active-link');
      // this.activeLink = null;
    }
    const target = (this.activeLink = event.target as HTMLElement);
    target.classList.add('active-link');
    this.activeLink = target;
  }

  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];

  // selectProjectData : any= [...this.Normalprojects,...this.importantProjects]

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

  // select project 
  selectProject(project:Project)
  {
   this.projectService.selectedProjectSubject.next(project);
  //  console.log('bahubali',project)
   this.toster.success('Project Selected')
   localStorage.setItem('selectedProject', JSON.stringify(project));
    
  }



  // logout

  logOut() {
    this.dialog.open(LogoutPopUpComponent, {
      width: '250px'
    });
  }
}
