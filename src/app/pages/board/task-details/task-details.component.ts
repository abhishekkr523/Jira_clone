import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../../../service/data-service.service';
import { Project } from '../../../user.interface';
import { parse } from 'path';
import { Router } from '@angular/router';

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
  pipelines: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private srv: DataServiceService,
    private router:Router
  ) {
    console.log('cc', data);
  }

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
      taskId: [''],
      status: [''],
    });

    console.log('taskform', this.taskForm.value);
    // Use the data passed to the dialog
    if (this.data) {
      console.log('dataa', this.data);

      this.taskForm.patchValue(this.data);
      console.log('dataaa', this.taskForm.value);
    }

    const getPeopleList = localStorage.getItem('addPeopleList');
    console.log('kikk', getPeopleList);
    if (getPeopleList) {
      this.peopleList = JSON.parse(getPeopleList);
      console.log('kik', this.peopleList);
    }
    this.loadProjects();
  }

  loadProjects(): void {
    const local = localStorage.getItem('projects');
    if (local) {
      let projects = JSON.parse(local);
      let activeProject = projects.find(
        (project: Project) => project.isSelected === true
      );
      // sprints = activeProject.sprints;
      if (activeProject) {
        const selectedSprint = activeProject.sprints
          .map((sprint: any) => {
            if (sprint.isSprintSelected) {
              return sprint;
            }
            return null;
          })
          .filter((sprint: null) => sprint !== null);
        console.log('aaaaaa', selectedSprint);
        if (selectedSprint.length > 0) {
          const status = selectedSprint[0].pipelines;

          this.pipelines = status.map((pipeline: any) => pipeline.title);
          console.log('Pipelineeee Titlessss:', this.pipelines);
          // this.Option={...titles}
          console.log('opt');
        }
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log('Form Data:', formData);

      const local = localStorage.getItem('projects');
      if (local) {
        let projects = JSON.parse(local);
        let activeProject = projects.find(
          (project: Project) => project.isSelected === true
        );

        if (activeProject) {
          const selectedSprint = activeProject.sprints
            .map((sprint: any) => {
              if (sprint.isSprintSelected) {
                return sprint;
              }
              return null;
            })
            .filter((sprint: any) => sprint !== null);

          if (selectedSprint.length > 0) {
            const pipeline = selectedSprint[0].pipelines;
            console.log('xxx', pipeline);
            // Find the pipeline that contains the task with the same taskId
            const previousPipeline = pipeline.find((pipe: any) =>
              pipe.tasks.some((task: any) => task.taskId === formData.taskId)
            );

            if (previousPipeline) {
              // Remove the previous task from its original pipeline
              previousPipeline.tasks = previousPipeline.tasks.filter(
                (task: any) => task.taskId !== formData.taskId
              );
            }

            // Find the pipeline matching the new status
            const matchingPipeline = pipeline.find(
              (pipe: any) =>
                pipe.title.toUpperCase() === formData.status.toUpperCase()
            );

            if (matchingPipeline) {
              // Add the edited task to the matching pipeline
              matchingPipeline.tasks.push({
                taskId: formData.taskId, // Keep the original taskId
                summary: formData.summary,
                description: formData.description,
                Assign: formData.Assign,
                Label: formData.Label,
                Parent: formData.Parent,
                Reporter: formData.Reporter,
                Time: formData.Time,
                status: formData.status,
                sprint: formData.sprint,
              });

              // Save the updated projects back to localStorage
              localStorage.setItem('projects', JSON.stringify(projects));

              console.log('Updated Pipeline:', matchingPipeline);
            } else {
              console.log('No matching pipeline found for the given status.');
            }
          }
        }
      }
    }
     // Reload the HomeComponent
  this.router.navigate(['/dashboard/board']).then(() => {
    window.location.reload();
  });
  }

  onCancel(): void {}

  toggleDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }
}
