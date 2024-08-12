import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../user.interface';
import { DataServiceService } from '../../../../service/data-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-trash-project',
  templateUrl: './all-trash-project.component.html',
  styleUrl: './all-trash-project.component.css',
})
export class AllTrashProjectComponent implements OnInit {
  projects: Project[] = [];
  leader: string | null = '';

  constructor( private dataService:DataServiceService,
    private toaster:ToastrService,
    private router:Router

  ) {}
  ngOnInit(): void {
    this.loadProjects();
    this.getStoredEmail();
  }

  loadProjects(): void {
    // Get projects from local storage
    const allProjects: Project[] = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );

    // Filter out projects that are moved to trash
    this.projects = allProjects.filter((project) => project.isMoveToTrash);
  }

  restoreFromTrash(project: Project): void {
   

    let allProjects: Project[] = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );

    // Find the project and set isMoveToTrash to false
    const projectIndex = allProjects.findIndex(p => p.projectName === project.projectName);
    if (projectIndex !== -1) {
      allProjects[projectIndex].isMoveToTrash = false;
      localStorage.setItem('projects', JSON.stringify(allProjects));
      this.loadProjects(); // Reload the list to reflect the restored project
     this.dataService.updateProjects(allProjects);
      this.toaster.success('Project restored from trash successfully');
     
      
    }
    
  }

  // get leader
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
