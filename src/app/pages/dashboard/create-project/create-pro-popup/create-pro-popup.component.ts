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

  coffie = faCoffee;
  imageUrl: string | undefined;

  // Option = ['In progress', 'Done', 'Ready to deploy'];
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
  status = [''];
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
  findproject: Project | undefined;
  selectSprint: { task: Task[]; [key: string]: any } = { task: [] };
  // abc: any;
  sprintPipeline: any;
  project: any;
  selectedSprintName: any;
  selectedSprintIds: any;
  peopleList: any;
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
      status: [],
      summary: ['', [Validators.required]],
      description: [''],
      Assign: [''],
      attachment: [''],
      Label: [''],
      Parent: [''],
      sprint: ['', [Validators.required]],
      Time: [''],
      Reporter: ['', [Validators.required]],
      LinkedIssue: [''],
      CreateAnotherIssue: [''],
    });
    console.log('j', this.registerProject);
    // })
    const setSelectedSprint = localStorage.getItem('selectedSprint');
    if (setSelectedSprint) {
      const parseSprint = JSON.parse(setSelectedSprint);
      this.selectedSprintIds=parseSprint[0].sprintId
      this.selectedSprintName = parseSprint[0].sprintName;
      this.sprintPipeline = parseSprint[0].pipelines;
    }

    const setSelectedProject = localStorage.getItem('selectedProject');
    if (setSelectedProject) {
      const parseProject = JSON.parse(setSelectedProject);
      this.project = parseProject;
      console.log('jjp', this.project);
    }

    const getPeopleList=localStorage.getItem('addPeopleList');
    console.log("kikk",getPeopleList)
    if(getPeopleList){
      this.peopleList=JSON.parse(getPeopleList);
      console.log("kik",this.peopleList)
    }

   

    // this.getProjectsFromLocalStorage()
    let existingData = this.localStorageService.getItem('Issue');
    console.log(existingData);
    console.log(typeof existingData);
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

        // console.log("ImageUrl",this.imageUrl)
      };
    }
  }
  onCloseDialog(): void {
    // this.serv.isVisible.next(false);
    // this.serv.isVisible.subscribe((res) => {
    //   this.isVisible2 = res;
    // });
    this.dialog.close();
  }

 
  addTaskToSprint(): void {
    console.log('registerProject', this.registerProject);
    const selectedSprintId2 = this.registerProject.value.sprint; // Retrieve the selected sprint ID
    console.log(selectedSprintId2, 'sprintid');
    const getProjectName = this.findproject?.projectName ?? 'Hello world';
    let description = this.registerProject.value.description;

    // Remove surrounding <p> and </p> tags if they exist
    description = description.replace(/^<p>/, '').replace(/<\/p>$/, '');
    if (this.registerProject.valid) {
      const newTask: Task = {
        taskId: Math.floor(Math.random() * 1000), // Generate a random ID
        ProjectName: getProjectName,
        taskName: this.registerProject.value.summary,
        description: description,
        IssueType: this.registerProject.value.IssueType,
        status: this.registerProject.value.status,
        summary: this.registerProject.value.summary,
        Assign: this.registerProject.value.Assign,
        attachment: this.registerProject.value.attachment,
        Label: this.registerProject.value.Label,
        Parent: this.registerProject.value.Parent,
        sprint: this.registerProject.value.sprint,
        Time: this.registerProject.value.Time,
        Reporter: this.registerProject.value.Reporter,
        LinkedIssue: this.registerProject.value.LinkedIssue,
        CreateAnotherIssue: this.registerProject.value.CreateAnotherIssue,
        storyPoints: this.registerProject.value.storyPoints,
      };
      console.log('vv', newTask);
  
      // Find the selected sprint based on sprint ID
      const sprint = this.project.sprints.find(
        (sprint: any) => sprint.sprintId === this.selectedSprintIds
      );
      console.log('v8v', sprint);
  
      if (sprint) {
        // Find the pipeline where the title matches the status of the new task
        const pipeline = sprint.pipelines.find(
          (pipeline: any) => pipeline.title === newTask.status
        );
  
        if (pipeline) {
          // Push the new task into the tasks array of the matched pipeline
          pipeline.tasks.push([newTask]);
  
          console.log('New task added to pipeline:', pipeline);
          
          this.localStorageService.setItem('selectedProject',this.project);
          this.updateSelectedSprintKey(sprint.sprintId);
          this.localStorageService.flag.next(true);


          // Optionally reset the form and close the modal here
          this.registerProject.reset();
          // Close your modal here (e.g., using a modal service)
        } else {
          console.error('No matching pipeline found for status:', newTask.status);
        }
      } else {
        console.error('No sprint found with ID:', selectedSprintId2);
      }
    }
  
  }
  
  updateSelectedSprintKey(id:any){
    console.log("id",id)
    const getSelectedProject = localStorage.getItem('selectedProject');
    if (getSelectedProject) {
      const parseProject = JSON.parse(getSelectedProject);
      this.project = parseProject;
      console.log('jj', this.project.projectName);
    }

    const findSprint = this.project.sprints.find(
      (sprint: any) => sprint.sprintId === id
    );
    console.log('vvvvids', findSprint);
    localStorage.setItem('selectedSprint', JSON.stringify([findSprint]));
  }
}

