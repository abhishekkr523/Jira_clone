import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-add-people-dialog',
  templateUrl: './add-people-dialog.component.html',
  styleUrls: ['./add-people-dialog.component.css']
})
export class AddPeopleDialogComponent implements OnInit {
  addPeopleForm!: FormGroup;
  peopleList: any[] = []; // To hold the list of people

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddPeopleDialogComponent>, private srv:DataServiceService) {}

  ngOnInit(): void {
    this.addPeopleForm = this.fb.group({
      nameEmail: ['', [Validators.required]],
      role: ['', Validators.required]
    });

    // Load existing people data from local storage
    const savedPeopleList = localStorage.getItem('addPeopleList');
    if (savedPeopleList) {
      this.peopleList = JSON.parse(savedPeopleList);
      this.srv.peoples.next(this.peopleList)
    }
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

  onCancel() {
    this.dialogRef.close();
  }
}
