import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  activeLink: HTMLElement | null = null;

  setActive(event: Event) {
    if (this.activeLink) {
      this.activeLink.classList.remove('active-link');
      // this.activeLink = null;
    }
    const target = (this.activeLink = event.target as HTMLElement);
    target.classList.add('active-link');
    this.activeLink = target;
  }

  ngOnInit(): void {
    this.resentProject()
    this.loadImportantProjects()
  }


  projects: any[] = [];
  resentProject() {
    if(typeof Storage !== "undefined")
    {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
        // this.filteredProjects = [...this.projects];

      }
    }
  }

  importantProjects: any[] = [];

  loadImportantProjects() {
    if (typeof Storage !== 'undefined') {
      const storedProjects = localStorage.getItem('importantProjects');
      if (storedProjects) {
        this.importantProjects = JSON.parse(storedProjects);
      }
    }
  }
}
