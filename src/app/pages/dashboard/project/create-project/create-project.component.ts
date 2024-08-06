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
  styleUrl: './create-project.component.css',
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

  keyValue: any = '';

  ngOnInit() {
    this.getStoredEmail();

    this.projectName.valueChanges.subscribe((data: any) => {
      this.keyValue = this.generateProjectKey(data);
    });
  }

  generateProjectKey(name: string) {
    let word = name.trim().split(/\s+/);
    let firstLetter = word.map((word) => word.charAt(0).toUpperCase()).join('');
    let digit = name.replace(/\D/g, '');
    return firstLetter + digit;



    // const words = name.trim().split(' ');

    // // Collect all the letters from each word into a single array
    // let letters:string[] = [];
    // words.forEach(word => {
    //     // Remove non-letter characters
    //     const filteredLetters = word.replace(/[^a-zA-Z]/g, '');
    //     if (filteredLetters) {
    //         letters = letters.concat(filteredLetters.split(''));
    //     }
    // });

    // // Randomly decide which letters to include in the shortform
    // const shortform = letters
    //     .filter(() => Math.random() < 0.5) // Adjust the probability as needed
    //     .slice(0, 3) // Adjust the number of letters if needed
    //     .join('')
    //     .toUpperCase();

    // return shortform;

  }
  startDate!: string;

  saveToLocalStorage(): void {
    if (this.projectName.valid) {
      // console.log(this.projectName.value)

      let existingProjects: Project[] = JSON.parse(
        localStorage.getItem('projects') || '[]'
      );
      const duplicateProject = existingProjects.find(
        (project) => project.projectName.toLowerCase() === this.projectName.value.toLowerCase()
      );

      if (duplicateProject) {
        this.toast.error('Project with the same name already exists.');
        return;
      }
      const startDate = new Date(this.startDate);
      const endDate = new Date(startDate);
      const newProject: Project = {
        projectId: Date.now(), // Using Date.now() for unique project ID
        projectName: this.projectName.value,
        projectKey: this.keyValue,
        isStar: false,
        sprints: [ ],
      };

      existingProjects.push(newProject);
      
      localStorage.setItem('projects', JSON.stringify(existingProjects));

      this.dataService.projectsSubject.next(existingProjects);
      this.dataService.updateProjects(existingProjects);

      this.toast.success('Successfully Add Project');
      //  this.toast.error('Something went wrong');

      this.router.navigate(['dashboard']);
    } else {
      alert('Please fix the errors in the form before saving.');
    }
  }

  // get user from local storage

  leader: string | null = '';
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
