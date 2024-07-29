import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../../../../userAuth/choose-templet/popup-dialog/popup-dialog.component';
import { SmallPopUpComponent } from './small-pop-up/small-pop-up.component';
import { ToastrService } from 'ngx-toastr';
import { DataServiceService } from '../../../../service/data-service.service';

@Component({
  selector: 'app-all-project-name',
  templateUrl: './all-project-name.component.html',
  styleUrl: './all-project-name.component.css',
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

  toggleTrashDiv(index: number): void {
    if (this.selectedProjectIndex === index) {
      this.selectedProjectIndex = null;
    } else {
      this.selectedProjectIndex = index;
    }
  }
  moveToTrash(): void {
    const dialogRef = this.dialog.open(SmallPopUpComponent, {
      width: '400px',
      height: '350px',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: {
        project: this.filteredProjects[this.selectedProjectIndex as number],
        index: this.selectedProjectIndex,
      },
    });
    // this.showTrashDiv = false

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        // Remove the project from local storage and update the view
        this.projects.splice(this.selectedProjectIndex as number, 1);
        localStorage.setItem('projects', JSON.stringify(this.projects));

        this.importantProjects.splice(this.selectedProjectIndex as number, 1);
        localStorage.setItem(
          'importantProjects',
          JSON.stringify(this.importantProjects)
        );
        this.filteredProjects = [...this.projects];
      }
    });
    this.dataService.updateProjects(this.projects);
    this.dataService.updateImportantProjects(this.importantProjects);
  }

  // show in html page
  // projects: any[] = [
  //   {
  //    normalProject:[
  //     {
  //       name:'',
  //       key:'',
  //       isstar:false
  //     }
  //    ]
  //   },
  //   {
  //     importantProjects:[
  //       {
  //         name:'',
  //         key:'',
  //         isstar:true
  //       }
  //     ]
  //   }
  // ];

  projects: any[] = [];
  ngOnInit(): void {
    this.loadProjects();

    this.loadImportantProjects();
  }
  loadProjects(): void {
    // Retrieve projects from localStorage
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
        this.filteredProjects = [...this.projects];
      }
    }
  }

  //search project start

  searchProduct: any;
  filteredProjects: any[] = [];

  filterProjects(): void {
    
    if (!this.searchProduct) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter((project) =>
        project.name.toLowerCase().includes(this.searchProduct.toLowerCase())
      );
    }
  }
  // search project end

  ///star icon

  importantProjects: any[] = [];
  // Load important projects from local storage
  loadImportantProjects() {
    if (typeof Storage !== 'undefined') {
      const importantProjects = localStorage.getItem('importantProjects');
      this.importantProjects = importantProjects
        ? JSON.parse(importantProjects)
        : [];
        // console.log(this.importantProjects)
    }
  }

  // Check if a project is in the important list
  isImportant(project: any): boolean {
    return this.importantProjects.find((p) => p.key === project.key);
  }

  // important project  start
  star(project: any) {
    if (this.isImportant(project)) {
      // Remove from important list
      this.importantProjects = this.importantProjects.filter(
        (p) => p.key !== project.key
      );
      this.projects.push(project);

      this.toster.success('Project marked as simple');
    } else {
      // Add to important list
      this.importantProjects.push(project);
      this.dataService.importantProjectsSubject.next(this.importantProjects);

      this.projects = this.projects.filter((p) => p.key !== project.key);
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

  //  this.filterProjects()
  }

  //important project end

  // filterout important project start
  // showOnlyImportant: boolean = false;
  // importantProjectFilter() {
  //   this.showOnlyImportant = !this.showOnlyImportant;
  //   if (this.showOnlyImportant) {
  //     this.filteredProjects = this.filteredProjects
  //       .slice()
  //       .sort((a, b) => (this.isImportant(b) ? 1 : -1));
  //   } else {
  //     this.filteredProjects = [...this.projects];
  //   }
  // }

  // filterout important project end
}
