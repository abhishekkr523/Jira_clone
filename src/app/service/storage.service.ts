import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project, Sprint } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  sprintSource = new BehaviorSubject<Sprint | null>(null);
  flag=new BehaviorSubject<boolean>(false)
  constructor() {}
 

  setSprint(sprint: any) {
    // this.sprintSource.next(sprint);
    console.log('set sprint', sprint);

   

  }
getProjects(){
  return JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
}
setProjects(project:Project[]){
  return localStorage.setItem('projects',JSON.stringify(project))
}
  getSelectedSprintFromLocalStorage() {
    if (typeof Storage !== 'undefined') {
      {
        const project = localStorage.getItem('selectedProject');
        return project ? JSON.parse(project) : null;
      }
    }
  }
  // sprint backlock to board end
}