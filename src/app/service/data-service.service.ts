import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Project, ProjectList, Sprint, Task } from '../user.interface';
import { json } from 'stream/consumers';
import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  peoples = new BehaviorSubject<any[]>([]);
  columns = new BehaviorSubject<any[]>([]);
  storePipeline = new BehaviorSubject<any[]>([]);
  isVisible = new BehaviorSubject<boolean>(false);

  isLoggedin = new BehaviorSubject<boolean>(false);

  // projectNameSubject = new Subject<string>()
  projectsSubject = new BehaviorSubject<Project[]>([]);
  importantProjectsSubject = new BehaviorSubject<Project[]>([]);
  //  selectedProjectSubject = new BehaviorSubject<any>(null);
  selectedProjectSubject = new BehaviorSubject<Project | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();
isSprintSelected$=new BehaviorSubject<boolean>(false)


  constructor() {
    this.loadProjects();
  }

  getActiveProject()
  {
    
   const local= localStorage.getItem('projects')
   
   if(local)
   {
     let projects = JSON.parse(local);
     let activeProject = projects.find((project:Project) => project.isSelected === true);
     this.selectedProjectSubject.next(activeProject);

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

  // Method to update projects
  updateProjects(projects: any[]) {
    this.projectsSubject.next(projects);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  // Method to update important projects


  // Add a new sprint to a specific project
  addSprintToProject(projectId: number, newSprint: Sprint): void {
    // Retrieve the existing projects from local storage
    const projects: Project[] = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );

    // Find the project by ID
    const project = projects.find((proj) => proj.projectId === projectId);
    if (project) {
      // Push the new sprint into the project's sprints array
      project.sprints.push(newSprint);

      // Save the updated projects array back to local storage
      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      console.error(`Project with ID ${projectId} not found.`);
    }
  }
  // addTaskToSprint(projectId: number, sprintId: number, newTask: Task): void {
  //   // Retrieve the existing projects from local storage
  //   const projects: Project[] = JSON.parse(
  //     localStorage.getItem('projects') || '[]'
  //   );

  //   // Find the project by ID
  //   const project = projects.find((proj) => proj.projectId === projectId);

  //   if (project) {
  //     // Find the sprint by ID within the project
  //     const sprint = project.sprints.find(
  //       (sprint) => sprint.sprintId === sprintId
  //     );

  //     if (sprint) {
  //       // Push the new task into the sprint's tasks array
  //       sprint.pipelines.tasks.push(newTask);

  //       // Save the updated projects array back to local storage
  //       localStorage.setItem('projects', JSON.stringify(projects));
  //     } else {
  //       console.error(
  //         `Sprint with ID ${sprintId} not found in project ${projectId}.`
  //       );
  //     }
  //   } else {
  //     console.error(`Project with ID ${projectId} not found.`);
  //   }
  // }

  // Get sprints for a specific project
  getSprintsByProjectId(projectId: number): Sprint[] | null {
    const projects: Project[] = JSON.parse(
      localStorage.getItem('projects') || '[]'
    );
    const project = projects.find((proj) => proj.projectId === projectId);
    return project ? project.sprints : null;
  }
  // Get tasks for a specific sprint and project

  // for zoom the screen
  // private isFullScreenSubject = new BehaviorSubject<boolean>(false);
  // getTasksBySprintId(projectId: number, sprintId: number): Task[] | null {
  //   const projects: Project[] = JSON.parse(
  //     localStorage.getItem('projects') || '[]'
  //   );
  //   const project = projects.find((proj) => proj.projectId === projectId);

  //   if (project) {
  //     const sprint = project.sprints.find(
  //       (sprint) => sprint.sprintId === sprintId
  //     );
  //     return sprint ? sprint.tasks : null;
  //   }

  //   return null;
  // }
  // for zoom the screen
  private isFullScreenSubject = new BehaviorSubject<boolean>(false);
  isFullScreen$ = this.isFullScreenSubject.asObservable();

  setFullScreen(isFullScreen: boolean) {
    this.isFullScreenSubject.next(isFullScreen);
  }
  updatePipeline(){
    localStorage.setItem('pipelines',JSON.stringify(this.columns))
  }
}
