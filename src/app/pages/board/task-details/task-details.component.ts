import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  peoples: any[] = [];
  columnTitle: any[] = [];
  isDropdownOpen = false;
  peopleList: any;
  // taskDetails: any[]=[];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private srv: DataServiceService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      summary: [''],
      description: [''],
      Assign: [''],
      Label: [''],
      Parent: [''],
      sprint: [''],
      Time: [''],
      Reporter: [''],
      taskId:['']
    });

    this.getTaskDetails();
    console.log('taskform', this.taskForm.value);
    // Use the data passed to the dialog
    if (this.data) {
      console.log('dataa', this.data);

      this.taskForm.patchValue(this.data[0]);
      console.log('dataaa', this.taskForm.value);
    }

    const getPeopleList = localStorage.getItem('addPeopleList');
    console.log('kikk', getPeopleList);
    if (getPeopleList) {
      this.peopleList = JSON.parse(getPeopleList);
      console.log('kik', this.peopleList);
    }
  }

  // onSubmit(): void {
  //   if (this.taskForm.valid) {
  //     const formData = this.taskForm.value;
  //     console.log('Form Dddata:', formData);
  //     const getdata = localStorage.getItem('selectedSprint');
  //     if (getdata) {
  //       const hh = JSON.parse(getdata);
  //       const idoftask = this.data.taskId;
  //       console.log(idoftask);
  //       console.log(hh);
  //     }
  //     // You can now use formData for further processing, like sending to an API
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  // onSubmit(): void {
  //   if (this.taskForm.valid) {
  //     const formData = this.taskForm.value;
  //     console.log('Form Data:', formData);
  
  //     const getdata = localStorage.getItem('selectedSprint');
  //     if (getdata) {
  //       const hh = JSON.parse(getdata);
  //       const idoftask = this.data.taskId;
  //       console.log('Task ID:', idoftask);
  //       console.log('Sprint Data:', hh);
  
  //       // Loop through the pipelines
  //       for (let pipeline of hh[0].pipelines) {
  //         // Loop through the tasks in each pipeline
  //         for (let taskGroup of pipeline.tasks) {
  //           for (let i = 0; i < taskGroup.length; i++) {
  //             if (taskGroup[i].taskId === idoftask) {
  //               // Update the task with the new formData
  //               taskGroup[i] = { ...taskGroup[i], ...formData };
  //               console.log('Updated Task:', taskGroup[i]);
  //               break;
  //             }
  //           }
  //         }
  //       }
  
  //       // Save the updated data back to local storage
  //       localStorage.setItem('selectedSprint', JSON.stringify(hh));
  //       console.log('Updated Sprint Data Saved to Local Storage:', hh);
  //     }
  //   }
  // }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log('Form Data:', formData);
  
      const getSelectedSprint = localStorage.getItem('selectedSprint');
      const getSelectedProject = localStorage.getItem('selectedProject');
  
      if (getSelectedSprint && getSelectedProject) {
        const hh = JSON.parse(getSelectedSprint);
        const selectedProject = JSON.parse(getSelectedProject);
        const idoftask = this.data[0].taskId;
        console.log('Task ID:', idoftask);
        console.log('Sprint Data:', hh);
  
        // Updating the task within the sprint
        for (let pipeline of hh[0].pipelines) {
          for (let taskGroup of pipeline.tasks) {
            for (let i = 0; i < taskGroup.length; i++) {
              if (taskGroup[i].taskId === idoftask) {
                taskGroup[i] = {...formData };
                console.log('Updated Task:', taskGroup[i]);
                console.log('Updated Task:', hh[0]);
                 localStorage.setItem('selectedSprint', JSON.stringify([hh[0]]));
                break;
              }
            }
          }
        }
  
        // Finding and updating the sprint in selectedProject
        for (let i = 0; i < selectedProject.sprints.length; i++) {
          if (selectedProject.sprints[i].sprintId === hh[0].sprintId) {
            selectedProject.sprints[i] = hh[0];
            console.log('Updated Sprint in Project:', selectedProject.sprints[i]);
            console.log('Updated Sprint in Projecttt:', selectedProject);
                    localStorage.setItem('selectedProject', JSON.stringify(selectedProject));

            break;
          }
        }
  
        // Save the updated project back to local storage
        // localStorage.setItem('selectedProject', JSON.stringify({selectedProject}));
        console.log('Updated Project Data Saved to Local Storage:', selectedProject);
      }
    }
  }
  
  
  
  getTaskDetails() {
    const taskData = localStorage.getItem('taskData');
    if (taskData) {
      this.taskForm.patchValue(JSON.parse(taskData));
    }
  }
  onCancel(): void {}

  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }
}
