import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faCancel, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../../../../service/data-service.service';
import { StorageService } from '../../../../service/storage.service';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Issue, Project, Sprint, Task, Team } from '../../../../user.interface';
import { json } from 'stream/consumers';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css',
})
export class CreateProPopupComponent implements OnInit {
  cancel = faCancel;
  projectName: string = ''
  coffie = faCoffee;
  imageUrl: string | undefined;

  Option = [];
  issue = ['Task', 'Bug', 'Story', 'Epic'];
  linkedIssue = [
    'blocks',
    'is block by',
    'clones',
    'is cloned by',
    'duplicates',
    'is duplicated by',
    'reviews',
    'is reviewed by',
    'causes',
    'is caused by',
    'related to',
  ];
  status = [];
  faCoffee: any;
  isVisible2: boolean = false;
  registerProject!: FormGroup;
  // projects: string[] = []
  editorContent: string = '';
  issueArray: any[] = [];
  projects: Project[] = [];
  importantProjects: Project[] = [];
  selectedProject3: Project[] = []
  selectedProjectId: number | null = null;
  sprints: Sprint[] = [];
  tasks: Task[] = [];
  selectedSprintId: number | null = null;
  findproject: Project | null = null;
  selectSprint: { task: Task[];[key: string]: any } = { task: [] };
  selectedProject!: Project;
  pipelines: any[] = [];
  selectedSprint: Sprint[] = []
  Team: string[] = []
  constructor(
    private dialog: MatDialogRef<CreateProPopupComponent>,
    private toast: ToastrService,
    private serv: DataServiceService,
    private localStorageService: StorageService,
    private fb: FormBuilder
  ) { }
  // findproject: Project | undefined
  getSelectedProject!: Project[]
  selectProject: { sprints: Sprint[], [key: string]: any } = { sprints: [] };
  loadUser = []
  // constructor(private dialog: MatDialogRef<CreateProPopupComponent>, private toast: ToastrService, private serv: DataServiceService, private localStorageService: StorageService, private fb: FormBuilder) {

  // }
  ngOnInit(): void {
    this.registerProject = this.fb.group({
      taskId: [''], // Assuming you generate or handle taskId separately
      ProjectName: ['', Validators.required],
      IssueType: ['', Validators.required],
      storyPoints: [''],
      status: [''],
      summary: ['', Validators.required],
      description: [''],
      Assign: [''],
      attachment: [''],
      Label: [''],
      sprint: ['', Validators.required],
      Time: [''],
      Reporter: ['', Validators.required],
      LinkedIssue: [''],
      CreateAnotherIssue: [''],
    });

    this.loadProjects();
  }
  loadProjects(): void {
    this.projects = this.localStorageService.getProjects()
    let addPeople = JSON.parse(localStorage.getItem('addPeopleList') || '[]');
    const projects = this.localStorageService.getProjects()
    // console.log(projects.find((p:Project)=> p.isSelected))
    let SelectedProject = projects.find((p: Project) => p.isSelected)
    let SelectedSprint = SelectedProject?.sprints.find((s: Sprint) => s.isSprintSelected === true)
    console.log([SelectedSprint])
    if (SelectedSprint) {
      this.selectedSprint = [SelectedSprint]
    }
    this.Team = addPeople.map((p: Team) => p.nameEmail)

    this.serv.getActiveProject();

    this.serv.selectedProjectSubject.subscribe((project: Project | null) => {
      if (project && project.isSelected) {
        this.selectedProject = project;
        this.projectName = this.selectedProject.projectName;
      }
    });
    const local = localStorage.getItem('projects');
    if (local) {
      let projects = JSON.parse(local);
      let activeProject = projects.find(
        (project: Project) => project.isSelected === true
      );
      this.sprints = activeProject.sprints;
      if (activeProject) {
        const selectedSprint = activeProject.sprints
          .map((sprint: any) => {
            if (sprint.isSprintSelected) {
              return sprint;
            }
            return null;
          })
          .filter((sprint: null) => sprint !== null);
        if (selectedSprint.length > 0) {
          this.Option = selectedSprint[0].pipelines;

          this.pipelines = this.Option.map((pipeline: any) => pipeline.title);


        }
      }

    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.registerProject.patchValue({
          attachment: this.imageUrl, // Update the form control with the base64 string
        });
      };
    }
  }
  onCloseDialog(): void {

    this.dialog.close();
  }



  createTask(): Task {
    const newTask: Task = {
      taskId: Date.now(), // You might want to generate a unique ID for the task
      taskName: this.registerProject.get('summary')?.value,
      storyPoints: this.registerProject.get('storyPoints')?.value,
      ProjectName: this.registerProject.get('ProjectName')?.value,
      IssueType: this.registerProject.get('IssueType')?.value,
      status: this.registerProject.get('status')?.value,
      summary: this.registerProject.get('summary')?.value,
      description: this.registerProject.get('description')?.value,
      Assign: this.registerProject.get('Assign')?.value,
      attachment: this.registerProject.get('attachment')?.value,

      // If you want to add a parent-child relationship
      sprint: this.registerProject.get('sprint')?.value,
      Time: this.registerProject.get('Time')?.value,
      Reporter: this.registerProject.get('Reporter')?.value,
      LinkedIssue: this.registerProject.get('LinkedIssue')?.value,
      CreateAnotherIssue: this.registerProject.get('CreateAnotherIssue')?.value,
    };
    return newTask;
  }

  addTaskToSprint(): void {
    const newTask = this.createTask();
    const selectedSprintId = this.registerProject.get('sprint')?.value;

    const activeProject = this.projects.find((project) => project.isSelected);
    console.log('yy', activeProject);
    if (activeProject) {
      const sprint = activeProject.sprints.find(
        (sprint) => sprint.sprintId == selectedSprintId
      );
      if (sprint) {
        // Find the corresponding pipeline column based on the task status
        const taskStatus = newTask.status.trim();

        // Log all pipeline titles to see if there's a matching one
        sprint.pipelines.forEach((column: { title: string }) => {
        });

        // Find the pipeline column that matches the task status
        const pipelineColumn = sprint.pipelines.find(
          (column: { title: string; tasks: Task[] }) =>
            column.title.trim().toLowerCase() === taskStatus.toLowerCase()
        );

        if (pipelineColumn) {
          // Initialize tasks array if not already done
          if (!pipelineColumn.tasks) {
            pipelineColumn.tasks = [];
          }

          // Add the new task to the corresponding column
          pipelineColumn.tasks.push(newTask);
          this.localStorageService.setProjects(this.projects)

          // Optional: Refresh the UI or show a success message
          this.toast.success('Task added successfully!');
          this.dialog.close();
        } else {
          this.toast.error('No matching pipeline column for the task status.');
        }
      } else {
        this.toast.error('Selected sprint not found.');
      }
    } else {
      this.toast.error('No active project selected.');
    }
  }


  updateLocalStorage(): void {
    const projects = this.localStorageService.getProjects()
    const projectIndex = projects.findIndex(
      (project: Project) => project.projectId === this.selectedProject.projectId
    );

    if (projectIndex !== -1) {
      projects[projectIndex].sprints = this.sprints;
      this.localStorageService.setProjects(projects)
    }
  }



}