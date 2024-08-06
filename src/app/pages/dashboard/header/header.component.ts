import { MatDialog } from '@angular/material/dialog';
import { CreateProPopupComponent } from '../create-project/create-pro-popup/create-pro-popup.component';
import { DataServiceService } from '../../../service/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Project, ProjectList } from '../../../user.interface';
import { Toast, ToastrService } from 'ngx-toastr';
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

  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];


  constructor(private projectService: DataServiceService,
    private toster: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    // this.selectProject(this.importantProjects[0]);
    this.projectService.projectsSubject.subscribe((projects: Project[]) => {
      this.Normalprojects = projects;
    });

    this.projectService.importantProjectsSubject.subscribe((importantProjects: Project[]) => {
      this.importantProjects = importantProjects;
    });
  }
  createIssue() {
    // const checkProject=JSON.parse(localStorage.getItem('projects')||'[]')
    const checkSelectedProjet = JSON.parse(localStorage.getItem('selectedProject') || '[]')
    // Check if selectedProject is not empty
    const hasSelectedProject = Array.isArray(checkSelectedProjet) && checkSelectedProjet.length > 0;
    const hasNonEmptySprints = checkSelectedProjet.some((project: { sprints: string | any[]; }) => Array.isArray(project.sprints) && project.sprints.length > 0);
    if (!hasNonEmptySprints) {
      this.toster.error('Please the create sprint ')
      // Set a timeout to clear the message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        this.router.navigate(['/dashboard/sprint'])
      }, 1000);
  
  }
    else if (hasSelectedProject) {
      console.log("joojojojo")
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
 }
     
   
   
    else {
      this.toster.error('Please the select the Project or create a project')
    }



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
  selectProject(project: Project) {
    
    const checkSelectedProjet: Project[] = JSON.parse(localStorage.getItem('selectedProject') || '[]');
    // const projectExists = checkSelectedProjet.some(project => project.projectId === project.projectId);
    let newUpdateProject:Project[]=[]

      // if(!projectExists){
        newUpdateProject  =[project] //  console.log('bahubali',project)
        this.toster.success('Project Selected')
        this.projectService.selectedProjectSubject.next(project);

        // checkSelectedProjet.push(project)
        localStorage.setItem('selectedProject', JSON.stringify(newUpdateProject));

        
        
      // }
      // else {
      //   this.toster.error('Already Selected Project')
       
      // }
    
    
   
  }
}



