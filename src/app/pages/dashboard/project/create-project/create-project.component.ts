import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// import { Route } from '@angular/router';
import { Router } from '@angular/router';
// import { HotToastService } from '@ngxpert/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent implements OnInit {


  constructor(private router : Router,private toast:ToastrService) { }
  projectName: FormControl = new FormControl('', [
    Validators.required,

    Validators.pattern('^[a-zA-Z0-9 ]*$'),
  ]);

  keyValue: any = '';

  ngOnInit() {
    this.projectName.valueChanges.subscribe((data: any) => {
      this.keyValue = this.generateProjectKey(data);
    });
  }

  generateProjectKey(name: string) {
    let word = name.trim().split(/\s+/);
    let firstLetter = word.map((word) => word.charAt(0).toUpperCase()).join('');
    let digit = name.replace(/\D/g, '');
    return firstLetter + digit;
  }

  saveToLocalStorage(): void {
    if (this.projectName.valid) {

      let existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const projectDetails = {
        name: this.projectName.value,
        key: this.keyValue,
        isStar: Boolean(false),
      };
      existingProjects.push(projectDetails);
      localStorage.setItem('projects', JSON.stringify(existingProjects));

      

     this.toast.success('Successfully Add Project');
    //  this.toast.error('Something went wrong');
  
      this.router.navigate(['dashboard']);
    } else {
      alert('Please fix the errors in the form before saving.');
    }

  }
}
