import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../../../userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { SmallPopUpComponent } from './small-pop-up/small-pop-up.component';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../../../service/data-service.service';
import { Project } from '../../../../user.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-all-project-name',
  templateUrl: './all-project-name.component.html',
  styleUrl: './all-project-name.component.scss',
})
export class AllProjectNameComponent implements OnInit {
  showTrashDiv: boolean = false;

  // pop up dialog

  constructor(
    private dialog: MatDialog,
    private toster: ToastrService,
    private dataService: DataServiceService
  ) {}

  selectedProjectIndex: number | null = null;

  // toggleTrashDiv(index: number): void {
  //   if (this.selectedProjectIndex === index) {
  //     this.selectedProjectIndex = null;
  //     // console.log('same',this.selectedProjectIndex);
  //   } else {
  //     this.selectedProjectIndex = index;
  //     // console.log('sannnme',this.selectedProjectIndex);
  //   }
  // }
  toggleTrashDiv(index: number): void {
    this.selectedProjectIndex = this.selectedProjectIndex === index ? null : index;
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

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.filteredProjects.splice(index, 1);
        this.projects = this.projects.filter(p => p.projectKey !== project.projectKey);
        this.importantProjects = this.importantProjects.filter(p => p.projectKey !== project.projectKey);
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('importantProjects', JSON.stringify(this.importantProjects));
        this.dataService.updateProjects(this.projects);
        this.dataService.updateImportantProjects(this.importantProjects);
      }
    });
  }

 
  projects: Project[] = [];
  ngOnInit(): void {
    this.loadProjects();
    this.getStoredEmail()
    this.loadImportantProjects();
  // Initialize filteredProjects with all projects
  this.filteredProjects = [...this.projects,...this.importantProjects];

  // Set up search functionality
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(searchTerm => this.filterProjects(searchTerm))
  ).subscribe(filteredProjects => {
    this.filteredProjects = filteredProjects;
  });
  }
  loadProjects(): void {
    // Retrieve projects from localStorage
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
        this.filteredProjects = [...this.projects,...this.importantProjects];
      }
    }
  }


  

 
  

  searchControl: FormControl = new FormControl('');
  filteredProjects: Project[] = [];



  
  filterProjects(searchTerm: string): Project[] {
    return this.projects.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectKey.toLowerCase().includes(searchTerm.toLowerCase()) 
      
    );
  }
























  

  ///star icon

  importantProjects: Project[] = [] ;
  // Load important projects from local storage
  loadImportantProjects() {
    if (typeof Storage !== 'undefined') {
      const importantProjects = localStorage.getItem('importantProjects');
      this.importantProjects = importantProjects
        ? JSON.parse(importantProjects)
        : [];
        this.filteredProjects = [...this.projects,...this.importantProjects];
    }
  }

  // Check if a project is in the important list
  isImportant(project: Project) {
    return this.importantProjects.find((p) => p.projectKey === project.projectKey);
  }

  // important project  start
  star(project: any) {
    project.isStar = !project.isStar;
    if (this.isImportant(project)) {
      // Remove from important list
      this.importantProjects = this.importantProjects.filter(
        (p) => p.projectKey !== project.projectKey
      );
         this.projects.push(project);    
      

      this.toster.success('Project marked as simple');
    } else {
      // Add to important list
      this.importantProjects.push(project);
        
      this.dataService.importantProjectsSubject.next(this.importantProjects);

      this.projects = this.projects.filter((p:Project) => p.projectKey !== project.projectKey);
      this.toster.warning('important Project');
    }

    // Save updated important projects and projects to local storage
    localStorage.setItem(
      'importantProjects',
      JSON.stringify(this.importantProjects)
    );
    localStorage.setItem('projects', JSON.stringify(this.projects));

    this.dataService.updateProjects(this.projects);
    this.dataService.updateImportantProjects(this.importantProjects);

  // this.loadImportantProjects()
  
  }

  //important project end

  // filterout important project start
  showOnlyImportant: boolean = false;
  importantProjectFilter() {
    this.showOnlyImportant = !this.showOnlyImportant;
    if (this.showOnlyImportant) {
      this.filteredProjects = this.filteredProjects
        .slice()
        .sort((a, b) => (this.isImportant(b) ? 1 : -1));
    } else {
      // this.filteredProjects = [...this.projects];
      this.filteredProjects = [...this.projects,...this.importantProjects];
    }
  }

  //  get  email from local storage 

  leader: string | null = '';
  getStoredEmail(): void {
   if(typeof Storage !== 'undefined') {
    this.leader = localStorage.getItem('userLogin');
    if (this.leader) {
      console.log('Retrieved email from local storage:', this.leader);
    } else {
      console.log('No email found in local storage');
    }
   }
  }


 

}
