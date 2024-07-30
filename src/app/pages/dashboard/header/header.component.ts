import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';
import { Project, ProjectList } from '../../../user.interface';

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

  Normalprojects: Project[] = [];
  importantProjects: Project[] = [];

  constructor(private projectService: DataServiceService) {}

  ngOnInit() {
    this.projectService.projectsSubject.subscribe((projects: Project[]) => {
      this.Normalprojects = projects;
    });

    this.projectService.importantProjectsSubject.subscribe((importantProjects: Project[]) => {
      this.importantProjects = importantProjects;
    });
  }
}
