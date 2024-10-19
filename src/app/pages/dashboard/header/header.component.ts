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
  status = false;
  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];
  selectedProject!: Project;
  constructor(
    private projectService: DataServiceService,
    private toster: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    // this.selectProject(this.importantProjects[0]);

    this.projectService.projectsSubject.subscribe((projects: Project[]) => {
      this.Normalprojects = projects.filter(
        (project) => !project.isStar && !project.isMoveToTrash
      );
      this.importantProjects = projects.filter(
        (project) => project.isStar && !project.isMoveToTrash
      );
    });
    this.getActiveProject();
  }
  getActiveProject() {
    this.projectService.getActiveProject();

    this.projectService.selectedProjectSubject.subscribe(
      (project: Project | null) => {
        if (project && project.isSelected) {
          this.selectedProject = project;
        }
      }
    );
  }

  // openDialog(): void {
  //   // this.getActiveProject()
  //   if (!JSON.parse(localStorage.getItem('projects') || '[]').length) {
  //     console.log(JSON.parse(localStorage.getItem('projects') || '[]'));
  //     this.toster.error('Please Create a project.');
  //   } else {
  //     if (!this.selectedProject) {
  //       this.toster.error('Please select a project.');
  //     } else {
  //       if (
  //         !this.selectedProject.sprints.length
  //         // this.selectedProject &&
  //         // this.selectedProject.sprints &&
  //         // this.selectedProject.sprints.length > 0
  //       ) {
  //         this.toster.error('Create a sprint first.');

  //         this.router.navigate(['/dashboard/sprint']);
  //       } else {
  //         for (let i = 0; i < this.selectedProject.sprints.length; i++) {
  //           if (this.selectedProject.sprints[i].isSprintSelected == true) {
  //             this.status = true;
  //           }
  //           if ((this.status = false)) {
  //             this.toster.error('Now start a sprint.');
  //             this.status = false;
  //           } else {
  //             const dialogRef = this.dialog.open(CreateProPopupComponent, {
  //               width: '1100px',
  //               height: '650px',
  //               maxWidth: 'none',
  //               panelClass: 'custom-dialog-container',
  //               data: { name: '', email: '' },
  //             });

  //             dialogRef.afterClosed().subscribe((result) => {
  //               console.log('The dialog was closed');
  //               console.log('Form data:', result);
  //             });
  //           }
  //         }
  //         // if(0){
  //         //   this.toster.error('Now start a sprint.');
  //         // }else{
  //         //   // If sprints array is not empty, open the dialog
  //         // const dialogRef = this.dialog.open(CreateProPopupComponent, {
  //         //   width: '1100px',
  //         //   height: '650px',
  //         //   maxWidth: 'none',
  //         //   panelClass: 'custom-dialog-container',
  //         //   data: { name: '', email: '' },
  //         // });

  //         // dialogRef.afterClosed().subscribe((result) => {
  //         //   console.log('The dialog was closed');
  //         //   console.log('Form data:', result);
  //         // });
  //         // }
  //       }
  //     }
  //   }
  // }

  // openDialog(): void {
  //   const projects = JSON.parse(localStorage.getItem('projects') || '[]');

  //   if (!projects.length) {
  //     this.toster.error('Please Create a project.');
  //     return;
  //   }

  //   if (!this.selectedProject) {
  //     this.toster.error('Please select a project.');
  //     return;
  //   }

  //   if (!this.selectedProject.sprints.length) {
  //     this.toster.error('Create a sprint first.');
  //     this.router.navigate(['/dashboard/sprint']);
  //     return;
  //   }

  //   let sprintSelected = false;

  //   // Check if any sprint is selected
  //   for (let i = 0; i < this.selectedProject.sprints.length; i++) {
  //     if (this.selectedProject.sprints[i].isSprintSelected) {
  //       sprintSelected = true;
  //       break;
  //     }
  //   }

  //   if (!sprintSelected) {
  //     this.toster.error('Now start a sprint.');
  //   } else {
  //     const dialogRef = this.dialog.open(CreateProPopupComponent, {
  //       width: '1100px',
  //       height: '650px',
  //       maxWidth: 'none',
  //       panelClass: 'custom-dialog-container',
  //       data: { name: '', email: '' },
  //     });

  //     dialogRef.afterClosed().subscribe((result) => {
  //       console.log('The dialog was closed');
  //       console.log('Form data:', result);
  //     });
  //   }
  // }


  // logout


  openDialog(): void {
    // Retrieve projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  
    // Check if there are any projects
    if (!projects.length) {
      this.toster.error('Please Create a project.');
      return;
    }
  
    // Retrieve the selected project from localStorage on each check to ensure up-to-date data
    const selectedProject = projects.find((proj: Project) => proj.isSelected);
  
    if (!selectedProject) {
      this.toster.error('Please select a project.');
      return;
    }
  
    // Check if the selected project has any sprints
    if (!selectedProject.sprints.length) {
      this.toster.error('Create a sprint first.');
      this.router.navigate(['/dashboard/sprint']);
      return;
    }
  
    // Check if any sprint is selected
    let sprintSelected = selectedProject.sprints.some(
      (sprint: { isSprintSelected: any; }) => sprint.isSprintSelected
    );
  
    if (!sprintSelected) {
      this.toster.error('Now start a sprint.');
    } else {
      // If a sprint is selected, open the dialog
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
    }
  }
  
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

    allProjects.forEach((proj: Project) => (proj.isSelected = false));

    let selectedProject = allProjects.find(
      (proj: Project) => proj.projectId === project.projectId
    );

    if (selectedProject) {
      selectedProject.isSelected = true;
    }

    localStorage.setItem('projects', JSON.stringify(allProjects));

    this.projectService.getActiveProject();

    this.router.navigate(['/dashboard']);
    this.toster.success('Project Selected');
  }
}
