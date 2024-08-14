
import { MatDialog } from '@angular/material/dialog';
import { CreateProPopupComponent } from '../create-project/create-pro-popup/create-pro-popup.component';
import { DataServiceService } from '../../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectList } from '../../../user.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { LogoutPopUpComponent } from './logout-pop-up/logout-pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  activeLink: HTMLElement | null = null;
  showMenu: boolean = true;

  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];
selectedProject!:Project
  constructor(
    private projectService: DataServiceService,
    private toster: ToastrService,
    private dialog: MatDialog,
    private router: Router,
  ) {}


  ngOnInit() {
    // this.selectProject(this.importantProjects[0]);

    this.projectService.projectsSubject.subscribe((projects: Project[]) => {

    
      this.Normalprojects = projects.filter((project) => !project.isStar && !project.isMoveToTrash);
      this.importantProjects = projects.filter((project) => project.isStar && !project.isMoveToTrash);
    });
    this.getProject()

  
  }

 

  getProject(){
    this.projectService.getActiveProject();
        
    this.projectService.selectedProjectSubject.subscribe((project:Project | null) => {
      if (project && project.isSelected) {
        this.selectedProject = project;
      }
      // console.log('tarun',project);
     
    })
  }

 
  openDialog(): void {
    this.getProject()
    
    if (
      this.selectedProject &&
      this.selectedProject.sprints &&
      this.selectedProject.sprints.length > 0
    ) {
      
      // If sprints array is not empty, open the dialog
      const dialogRef = this.dialog.open(CreateProPopupComponent, {
        width: '1100px',
        height: '650px',
        maxWidth: 'none',
        panelClass: 'custom-dialog-container',
        data: { name: '', email: '' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        console.log('Form data:', result);
      });
    } else {
      this.toster.error('Please the create sprint ');

      this.router.navigate(['/dashboard/sprint']);
    }
  }

  // logout

  logOut() {
    this.dialog.open(LogoutPopUpComponent, {
      width: '250px',
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
  selectProject(project: Project) {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    allProjects.forEach((proj: Project) => proj.isSelected = false);

    let selectedProject = allProjects.find((proj: Project) => proj.projectId === project.projectId);

    if (selectedProject) {
      selectedProject.isSelected = true;
    }


    localStorage.setItem('projects', JSON.stringify(allProjects));
    
    this.projectService.getActiveProject()


    this.router.navigate(['/dashboard']);
    this.toster.success('Project Selected');

   
  }
}
