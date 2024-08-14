import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import { Route } from '@angular/router';
import { Router } from '@angular/router';
// import { HotToastService } from '@ngxpert/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { DataServiceService } from '../../../../service/data-service.service';
import { Project, ProjectList } from '../../../../user.interface';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  projects: ProjectList = { projects: [] };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private dataService: DataServiceService
  ) {}
  projectName: FormControl = new FormControl('', [
    Validators.required,

    Validators.pattern('^[a-zA-Z0-9 ]*$'),
  ]);

  keyValue: string = '';
  manualKeyUpdate: boolean = false;
  ngOnInit() {
    this.getStoredEmail();

    this.projectName.valueChanges.subscribe((data: any) => {
      if (!this.manualKeyUpdate) {
        this.keyValue = this.generateProjectKey(data);
      }
    });
  }

  generateProjectKey(name: string) {
    let word = name.trim().split(/\s+/);
    let firstLetter = word.map((word) => word.charAt(0).toUpperCase()).join('');

    let middleLetter = word.length > 1 ? word[1].charAt(0).toUpperCase() : '';

    let randomString = Math.random().toString(36).substring(2, 3).toUpperCase(); // Generates a random string of length 6

    return firstLetter + middleLetter + randomString;
  }
  startDate!: string;

  saveToLocalStorage(): void {
    if (this.projectName.valid) {
      let existingProjects: Project[] = JSON.parse(
        localStorage.getItem('projects') || '[]'
      );
      const duplicateName = existingProjects.find(
        (project) =>
          project.projectName.toLowerCase() ===
          this.projectName.value.toLowerCase()
      );

      const duplicateKey = existingProjects.find(
        (project) =>
          project.projectKey.toLowerCase() === this.keyValue.toLowerCase()
      );

      if (duplicateName) {
        this.toast.error('Project Same Name already exists.');
        return;
      } else if (duplicateKey) {
        // this.toast.error(' Same Key already exists.');
        let word = this.projectName.value.trim().split(/\s+/);
        let firstLetter = word.map((word:any) => word.charAt(0).toUpperCase()).join('');
    
        let middleLetter = word.length > 1 ? word[1].charAt(0).toUpperCase() : '';
    
        let randomString = Math.random().toString(36).substring(2, 3).toUpperCase(); // Generates a random string of length 6
    
       this.keyValue= firstLetter + middleLetter + randomString;
        // return;
      }
      
      const startDate = new Date(this.startDate);
      const endDate = new Date(startDate);
      const newProject: Project = {
        projectId: Date.now(), // Using Date.now() for unique project ID
        projectName: this.projectName.value,
        projectKey: this.keyValue,
        isStar: false,
        isSelected: false,
        isMoveToTrash: false,
        sprints: [],
      };

      existingProjects.push(newProject);

      localStorage.setItem('projects', JSON.stringify(existingProjects));

      this.dataService.projectsSubject.next(existingProjects);
      this.dataService.updateProjects(existingProjects);

      this.toast.success('Successfully Add Project');

      this.router.navigate(['showAllProjects']);
    } else {
      alert('Please fix the errors in the form before saving.');
    }
  }

  onCancel() {
    this.router.navigate(['showAllProjects']);
  }
  // get user from local storage

  leader: string | null = '';
  email:string | null = '';
  getStoredEmail(): void {
    if (typeof Storage !== 'undefined') {
      this.leader = localStorage.getItem('userLogin');
      if (this.leader) {
        this.email= this.leader.split(',')[0].split(':')[1].split('"')[1];
        console.log('Retrieved email from local storage:', this.email);

        
      } else {
        console.log('No email found in local storage');
      }
    }
  }


}
