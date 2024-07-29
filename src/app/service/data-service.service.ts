import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

   projectsSubject = new BehaviorSubject<any[]>([]);
   importantProjectsSubject = new BehaviorSubject<any[]>([]);

  // Observable streams
  projects$ = this.projectsSubject.asObservable();
  importantProjects$ = this.importantProjectsSubject.asObservable();

  constructor() {
    this.loadProjects();
    this.loadImportantProjects();
  }

  private loadProjects() {
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projectsSubject.next(JSON.parse(storedProjects));
      }
    }
  }

  private loadImportantProjects() {
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('importantProjects');
      if (storedProjects) {
        this.importantProjectsSubject.next(JSON.parse(storedProjects));
      }
    }
  }

  // Method to update projects
  updateProjects(projects: any[]) {
    this.projectsSubject.next(projects);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Method to update important projects
  updateImportantProjects(importantProjects: any[]) {
    this.importantProjectsSubject.next(importantProjects);
    localStorage.setItem('importantProjects', JSON.stringify(importantProjects));
  }

 
}
