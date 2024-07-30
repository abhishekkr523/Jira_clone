import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  // taskDetails: any[]=[];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [''],
      description: [''],
      assignee: [''],
      labels: [''],
      parent: [''],
      sprint: [''],
      storyPoints: [''],
      reporter: [''],
    });

    this.getTaskDetails();

    // Use the data passed to the dialog
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
  }

  onSave(): void {
    localStorage.setItem('taskData', JSON.stringify(this.taskForm.value));
    console.log('Data saved to local storage:', this.taskForm.value);
  }
  getTaskDetails() {
    const taskData = localStorage.getItem('taskData');
    if (taskData) {
      this.taskForm.patchValue(JSON.parse(taskData));
    }
  }
  onCancel(): void {}
}
