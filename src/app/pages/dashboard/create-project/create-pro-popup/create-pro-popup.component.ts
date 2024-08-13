// import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { faCancel, faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { DataServiceService } from '../../../../service/data-service.service';
// import { StorageService } from '../../../../service/storage.service';
// import {
//   FormBuilder,
//   FormGroup,
//   FormGroupDirective,
//   Validators,
// } from '@angular/forms';
// import { Issue, Project, Sprint, Task } from '../../../../user.interface';
// import { json } from 'stream/consumers';
// import { ToastrService } from 'ngx-toastr';
// @Component({
//   selector: 'app-create-pro-popup',
//   templateUrl: './create-pro-popup.component.html',
//   styleUrl: './create-pro-popup.component.css',
// })
// export class CreateProPopupComponent implements OnInit {
//   cancel = faCancel;
// projectName:string=''
//   coffie = faCoffee;
//   imageUrl: string | undefined;
// peopleList=['In progress', 'Done', 'Ready to deploy']
//   Option = ['In progress', 'Done', 'Ready to deploy'];
//   issue = ['Task', 'Bug', 'Story', 'Epic'];
//   linkedIssue = [
//     'blocks',
//     'is block by',
//     'clones',
//     'is cloned by',
//     'duplicates',
//     'is duplicated by',
//     'reviews',
//     'is reviewed by',
//     'causes',
//     'is caused by',
//     'related to',
//   ];
//   status = [''];
//   faCoffee: any;
//   isVisible2: boolean = false;
//   registerProject!: FormGroup;
//   // projects: string[] = []
//   editorContent: string = '';
//   isMinimized: boolean = false;
//   reporter = ['krishna', 'tarun', 'abhishek'];
//   issueArray: any[] = [];
//   projects: Project[] = [];
//   selectedProjectId: number | null = null;
//   sprints: Sprint[] = [];
//   tasks: Task[] = [];
//   findproject: Project | undefined;
//   selectSprint: { task: Task[]; [key: string]: any } = { task: [] };
//   selectedProject!:Project
//   project: any;
//   selectedSprintIds: any;
//   constructor(
//     private dialog: MatDialogRef<CreateProPopupComponent>,
//     private toast: ToastrService,
//     private serv: DataServiceService,
//     private localStorageService: StorageService,
//     private fb: FormBuilder
//   ) {}
//   ngOnInit(): void {
//     this.registerProject = this.fb.group({
//       taskId: [''],
//       ProjectName: ['', [Validators.required]],
//       IssueType: ['', [Validators.required]],
//       storyPoints: [''],
//       status: [],
//       summary: ['', [Validators.required]],
//       description: [''],
//       Assign: [''],
//       attachment: [''],
//       Label: [''],
//       sprint: ['', [Validators.required]],
//       Time: [''],
//       Reporter: ['', [Validators.required]],
//       LinkedIssue: [''],
//       CreateAnotherIssue: [''],
//     });
//     this.loadProjects();

//   }
//   loadProjects(): void {
//     this.projects = JSON.parse(localStorage.getItem('projects') || '[]');

//     this.serv.getActiveProject();

//     this.serv.selectedProjectSubject.subscribe((project:Project | null) => {
//       if (project && project.isSelected) {
//         this.selectedProject = project;
//         this.projectName=this.selectedProject.projectName
//       }

//     })  }

//   onFileSelected(event: any) {
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader: FileReader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         this.imageUrl = reader.result as string;
//         this.registerProject.patchValue({
//           attachment: this.imageUrl, // Update the form control with the base64 string
//         });

//       };
//     }
//   }
//   onCloseDialog(): void {

//     this.dialog.close();
//   }

//   onProjectSelect(selectedProjectId: number): void {

//     this.selectedProjectId = selectedProjectId;
//     this.sprints = this.getSprintsByProjectId(selectedProjectId);
//   }
//   getSprintsByProjectId(projectId: number): Sprint[] {
//     this.findproject = this.projects.find(
//       (proj) => proj.projectId === projectId
//     );

//     return this.findproject ? this.findproject.sprints : [];
//   }

//   getAllTasksByProjectId(projectId: number): Task[] {
//     const project = this.projects.find((proj) => proj.projectId === projectId);
//     if (project) {
//       // Flatten all tasks from sprints
//       return project.sprints.flatMap((sprint) => sprint.tasks);
//     }
//     return [];
//   }
//   addTaskToSprint(): void {
//     console.log('registerProject', this.registerProject);
//     const selectedSprintId2 = this.registerProject.value.sprint; // Retrieve the selected sprint ID
//     const getProjectName = this.findproject?.projectName ?? 'Hello world';
//     if (
//       this.registerProject.valid &&
//       this.selectedProjectId &&
//       selectedSprintId2
//     ) {
//       const newTask: Task = {
//         taskId: Math.floor(Math.random() * 1000), // Generate a random ID
//         ProjectName: getProjectName,
//         taskName: this.registerProject.value.summary,
//         description: this.registerProject.value.description,
//         IssueType: this.registerProject.value.IssueType,
//         status: this.registerProject.value.status,
//         summary: this.registerProject.value.summary,
//         Assign: this.registerProject.value.Assign,
//         attachment: this.registerProject.value.attachment,
//         Label: this.registerProject.value.Label,
//         sprint: this.registerProject.value.sprint,
//         Time: this.registerProject.value.Time,
//         Reporter: this.registerProject.value.Reporter,
//         LinkedIssue: this.registerProject.value.LinkedIssue,
//         CreateAnotherIssue: this.registerProject.value.CreateAnotherIssue,
//         storyPoints: this.registerProject.value.storyPoints,
//       };
//       console.log('vv', newTask);

//       // Find the selected sprint based on sprint ID
//       const sprint = this.project.sprints.find(
//         (sprint: any) => sprint.sprintId === this.selectedSprintIds
//       );
//       console.log('v8v', sprint);

//       if (sprint) {
//         // Find the pipeline where the title matches the status of the new task
//         const pipeline = sprint.pipelines.find(
//           (pipeline: any) => pipeline.title === newTask.status
//         );

//         if (pipeline) {
//           // Push the new task into the tasks array of the matched pipeline
//           pipeline.tasks.push([newTask]);

//           console.log('New task added to pipeline:', pipeline);

//           this.updateSelectedSprintKey(sprint.sprintId);
//           this.localStorageService.flag.next(true);

//           // Optionally reset the form and close the modal here
//           this.registerProject.reset();
//           // Close your modal here (e.g., using a modal service)
//         } else {
//           console.error('No matching pipeline found for status:', newTask.status);
//         }
//       } else {
//         console.error('No sprint found with ID:', selectedSprintId2);
//       }
//     }

//   }

//   updateSelectedSprintKey(id:any){
//     console.log("id",id)
//     const getSelectedProject = localStorage.getItem('selectedProject');
//     if (getSelectedProject) {
//       const parseProject = JSON.parse(getSelectedProject);
//       this.project = parseProject;
//       console.log('jj', this.project.projectName);
//     }

//     const findSprint = this.project.sprints.find(
//       (sprint: any) => sprint.sprintId === id
//     );
//     console.log('vvvvids', findSprint);
//     localStorage.setItem('selectedSprint', JSON.stringify([findSprint]));
//   }
// }

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
import { Issue, Project, Sprint, Task } from '../../../../user.interface';
import { json } from 'stream/consumers';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css',
})
export class CreateProPopupComponent implements OnInit {
  cancel = faCancel;
  projectName: string = '';
  coffie = faCoffee;
  imageUrl: string | undefined;

  Option = ['In progress', 'Done', 'Ready to deploy'];
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
  status = ['To Do', 'In Progress', 'Ready to Deploy', 'Done'];
  faCoffee: any;
  isVisible2: boolean = false;
  registerProject!: FormGroup;
  // projects: string[] = []
  editorContent: string = '';
  isMinimized: boolean = false;
  reporter = ['krishna', 'tarun', 'abhishek'];
  issueArray: any[] = [];
  projects: Project[] = [];
  selectedProjectId: number | null = null;
  sprints: Sprint[] = [];
  tasks: Task[] = [];
  selectedSprintId: number | null = null;
  findproject: Project | undefined;
  selectSprint: { task: Task[]; [key: string]: any } = { task: [] };
  selectedProject!: Project;
  constructor(
    private dialog: MatDialogRef<CreateProPopupComponent>,
    private toast: ToastrService,
    private serv: DataServiceService,
    private localStorageService: StorageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.registerProject = this.fb.group({
      taskId: [''],
      ProjectName: ['', [Validators.required]],
      IssueType: ['', [Validators.required]],
      storyPoints: [''],
      status: [''],
      summary: ['', [Validators.required]],
      description: [''],
      Assign: [''],
      attachment: [''],
      Label: [''],
      sprint: ['', [Validators.required]],
      Time: [''],
      Reporter: ['', [Validators.required]],
      LinkedIssue: [''],
      CreateAnotherIssue: [''],
    });
    this.loadProjects();
  }
  loadProjects(): void {
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');

    this.serv.getActiveProject();

    this.serv.selectedProjectSubject.subscribe((project: Project | null) => {
      if (project && project.isSelected) {
        this.selectedProject = project;
        this.projectName = this.selectedProject.projectName;
      }
    });
    const local= localStorage.getItem('projects')
    if(local){
      let projects = JSON.parse(local);
      let activeProject = projects.find((project:Project) => project.isSelected === true);
      this.sprints=activeProject.sprints
     
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

  onProjectSelect(selectedProjectId: number): void {
    this.selectedProjectId = selectedProjectId;
    this.sprints = this.getSprintsByProjectId(selectedProjectId);
  }
  getSprintsByProjectId(projectId: number): Sprint[] {
    this.findproject = this.projects.find(
      (proj) => proj.projectId === projectId
    );

    return this.findproject ? this.findproject.sprints : [];
  }

  getAllTasksByProjectId(projectId: number): Task[] {
    const project = this.projects.find((proj) => proj.projectId === projectId);
    if (project) {
      // Flatten all tasks from sprints
      return project.sprints.flatMap((sprint) => sprint.tasks);
    }
    return [];
  }
  addTaskToSprint(): void {
    const selectedSprintId2 = this.registerProject.value.sprint; // Retrieve the selected sprint ID
    const getProjectName = this.findproject?.projectName ?? 'Hello world';
    if (
      this.registerProject.valid &&
      this.selectedProjectId &&
      selectedSprintId2
    ) {
      const newTask: Task = {
        taskId: Math.floor(Math.random() * 1000), // Generate a random ID
        ProjectName: getProjectName,
        taskName: this.registerProject.value.summary,
        description: this.registerProject.value.description,
        IssueType: this.registerProject.value.IssueType,
        status: this.registerProject.value.status,
        summary: this.registerProject.value.summary,
        Assign: this.registerProject.value.Assign,
        attachment: this.registerProject.value.attachment,
        Label: this.registerProject.value.Label,
        sprint: this.registerProject.value.sprint,
        Time: this.registerProject.value.Time,
        Reporter: this.registerProject.value.Reporter,
        LinkedIssue: this.registerProject.value.LinkedIssue,
        CreateAnotherIssue: this.registerProject.value.CreateAnotherIssue,
        storyPoints: this.registerProject.value.storyPoints,
      };

      const project = this.projects.find(
        (proj) => proj.projectId === this.selectedProjectId
      );
      if (project) {
        const sprint = project.sprints.find(
          (sprint) => sprint.sprintId == selectedSprintId2
        );
        if (sprint) {
          sprint.tasks.push(newTask);
          // Save updated projects to local storage
          const updatedProjects = this.projects.map((p) =>
            p.projectId === this.selectedProjectId
              ? { ...p, sprints: project.sprints }
              : p
          );
          localStorage.setItem('projects', JSON.stringify(updatedProjects));
          localStorage.setItem(
            'importantProjects',
            JSON.stringify(updatedProjects)
          );
          localStorage.setItem('selectedProject', JSON.stringify(project));

          this.toast.success('Issue is added');
          this.dialog.close();
        }
      }

      // Optionally reset the form and close the modal here
      this.registerProject.reset();
      // Close your modal here (e.g., using a modal service)
    }
  }
}
