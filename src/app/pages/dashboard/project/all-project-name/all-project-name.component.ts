import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../../../userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { SmallPopUpComponent } from './small-pop-up/small-pop-up.component';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../../../service/data-service.service';
import { Project } from '../../../../user.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-project-name',
  templateUrl: './all-project-name.component.html',
  styleUrl: './all-project-name.component.scss',
})
export class AllProjectNameComponent implements OnInit {
  // showTrashDiv: boolean = false;

  showTrashDiv: boolean = false;
  selectedProjectIndex: number | null = null;
  projects: Project[] = [];
  importantProjects: Project[] = [];
  filteredProjects: Project[] = [];
  searchControl: FormControl = new FormControl('');
  showOnlyImportant: boolean = false;
  leader: string | null = '';
  // pop up dialog
  filter: Project[] = [];
  constructor(
    private dialog: MatDialog,
    private toster: ToastrService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.getStoredEmail();
    // this.loadImportantProjects();
    // Initialize filteredProjects with all projects
   this.filter=[...this.projects]
   this.initializeSearch();
    // this.filteredProjects = [...this.projects];
    this.filteredProjects = this.projects.filter(p => !p.isMoveToTrash);

    // Set up search functionality
   
  }

  moveToTrash(index: number): void {
    const project = this.filteredProjects[index];
    const dialogRef = this.dialog.open(SmallPopUpComponent, {
      width: '400px',
      height: '370px',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: {
        project: project,
        index: index,
      },
    });

   
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        // Mark the project as moved to trash
        project.isMoveToTrash = true;
        // Update the localStorage with the new state
        localStorage.setItem('projects', JSON.stringify(this.projects));
        // Filter the projects again to reflect the changes
        // this.filteredProjects = this.filterProjects(this.searchControl.value);
        this.filteredProjects = this.projects.filter(p => !p.isMoveToTrash);
        this.dataService.updateProjects(this.projects);
      }
    });
  }

  initializeSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((searchTerm) => this.filterProjects(searchTerm))
      )
      .subscribe((res) => {
        this.filteredProjects = res;

        // console.log('searchTerm', res);
      });

  }
 

  filterProjects(searchTerm: string) {
    return this.filter.filter(
      (project) =>
        !project.isMoveToTrash &&
        (project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectKey.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  
  loadProjects(): void {
    // Retrieve projects from localStorage
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
        
        this.filteredProjects = this.projects.filter(p => !p.isMoveToTrash);
      }
    }
  }

 
  star(project: Project) {
    project.isStar = !project.isStar;  // Toggle the isStar property
  
    // Save updated projects list to local storage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  
    this.dataService.updateProjects(this.projects);
  
    if (project.isStar) {
      this.toster.warning('Project marked as important');
    } else {
      this.toster.success('Project marked as simple');
    }
  }
  

  //important project end



   // select project
   selectProject(project: Project) {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    allProjects.forEach((proj: Project) => proj.isSelected = false);

    let selectedProject = allProjects.find((proj: Project) => proj.projectId === project.projectId);

    if (selectedProject) {
      selectedProject.isSelected = true;
    }


    localStorage.setItem('projects', JSON.stringify(allProjects));
    
    this.dataService.getActiveProject()

    //  console.log('bahubali',project)
    this.router.navigate(['/dashboard']);
    this.toster.success('Project Selected');

   
  }
  // filterout important project start

  importantProjectFilter() {
    this.showOnlyImportant = !this.showOnlyImportant;
    if (this.showOnlyImportant) {
      this.filteredProjects = this.filteredProjects
        .slice()
        .sort((a, b) => 
          (b.isStar ? 1 : -1) - (a.isStar ? 1 : -1)
        // return (b.isStar ? 1 : 0) - (a.isStar ? 1 : 0);
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }

  //  get  email from local storage

  getStoredEmail(): void {
    if (typeof Storage !== 'undefined') {
      this.leader = localStorage.getItem('userLogin');
      if (this.leader) {
        console.log('Retrieved email from local storage:', this.leader);
      } else {
        console.log('No email found in local storage');
      }
    }
  }
}
