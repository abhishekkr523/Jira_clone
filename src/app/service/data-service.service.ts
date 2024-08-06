import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Project, ProjectList, Sprint, Task } from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  isVisible=new BehaviorSubject<boolean>(false)

  projectNameSubject = new Subject<string>()
   projectsSubject = new BehaviorSubject<Project[]>([]);
   importantProjectsSubject = new BehaviorSubject<Project[]>([]);
  //  selectedProjectSubject = new BehaviorSubject<any>(null);
   selectedProjectSubject = new BehaviorSubject<Project | null>(this.getSelectedProjectFromLocalStorage());
   selectedProject$ = this.selectedProjectSubject.asObservable();

  constructor() {
    this.loadProjects();
    this.loadImportantProjects();
    
   
  }


  getSelectedProjectFromLocalStorage() {
   if(typeof Storage !== 'undefined') {
   {
    const project = localStorage.getItem('selectedProject');
    return project ? JSON.parse(project) : null;
   }
  }
}
   loadProjects() {
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projectsSubject.next(JSON.parse(storedProjects));
      }
    }
  }

   loadImportantProjects() {
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



  // Get sprints for a specific project
  getSprintsByProjectId(projectId: number): Sprint[] | null {
    const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(proj => proj.projectId === projectId);
    return project ? project.sprints : null;
  }
  // Get tasks for a specific sprint and project
getTasksBySprintId(projectId: number, sprintId: number): Task[] | null {
  const projects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
  const project = projects.find(proj => proj.projectId === projectId);
  
  if (project) {
    const sprint = project.sprints.find(sprint => sprint.sprintId === sprintId);
    return sprint ? sprint.tasks : null;
  }
  
  return null;
}
// for zoom the screen 
private isFullScreenSubject = new BehaviorSubject<boolean>(false);
  isFullScreen$ = this.isFullScreenSubject.asObservable();

  setFullScreen(isFullScreen: boolean) {
    this.isFullScreenSubject.next(isFullScreen);
  } 



}
