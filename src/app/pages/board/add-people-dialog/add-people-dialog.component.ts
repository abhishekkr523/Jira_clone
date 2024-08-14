import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from '../../../service/data-service.service';
import { Project } from '../../../user.interface';

@Component({
  selector: 'app-add-people-dialog',
  templateUrl: './add-people-dialog.component.html',
  styleUrls: ['./add-people-dialog.component.css']
})
export class AddPeopleDialogComponent implements OnInit {
  addPeopleForm!: FormGroup;
  peopleList: any[] = []; // To hold the list of people
  selectedProject!: Project;
  projectName!: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddPeopleDialogComponent>, private srv:DataServiceService) {}

  ngOnInit(): void {
    this.addPeopleForm = this.fb.group({
      nameEmail: ['', [Validators.required]]
    });

    // Load existing people data from local storage
    const savedPeopleList = localStorage.getItem('addPeopleList');
    if (savedPeopleList) {
      this.peopleList = JSON.parse(savedPeopleList);
      this.srv.peoples.next(this.peopleList)
    }


    this.srv.selectedProjectSubject.subscribe((project: Project | null) => {
      if (project && project.isSelected) {
        this.selectedProject = project;
        this.projectName = this.selectedProject.projectName;
        console.log("hh",this.projectName)
      }
    });
  }

  onSubmit() {
    if (this.addPeopleForm.valid) {
      console.log(this.addPeopleForm.value);
   
      this.peopleList.push(this.addPeopleForm.value);
      this.srv.peoples.next(this.peopleList)

      localStorage.setItem('addPeopleList', JSON.stringify(this.peopleList));

      // this.addPeopleForm.reset();
      this.dialogRef.close();
    }
  }

}
