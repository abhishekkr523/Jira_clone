import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sprint } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  sprintSource = new BehaviorSubject<Sprint | null>(null);
  constructor() {}
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  setSprint(sprint: any) {
    this.sprintSource.next(sprint);
    console.log('set sprint', sprint);
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
