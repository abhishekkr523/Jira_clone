import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Router } from '@angular/router';
import { AddPeopleDialogComponent } from './add-people-dialog/add-people-dialog.component';
import { DataServiceService } from '../../service/data-service.service';
import { DateAdapter } from '@angular/material/core';
import { StorageService } from '../../service/storage.service';
import { Project, Sprint } from '../../user.interface';
import { filter, from, map, switchMap, take, toArray } from 'rxjs';
import { pipeline } from 'stream';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  add: boolean = false;
  plus: boolean = true;
  flag: boolean = true;
  titleInput: any;
  createIssue: boolean = false;
  filteredColumns: any[] = []; // To store filtered columns
  isFullScreen = false;

  iconChange: boolean = false;
  pipeLine: any;
  selectProject: { sprints: Sprint[]; [key: string]: any } = { sprints: [] };
  columns: any = [
    {
      title: 'TO DO',
      showInput: false,
      tasks: [],
    },
    {
      title: 'IN PROGRESS',
      showInput: false,
      tasks: [],
    },
    {
      title: 'DONE',
      showInput: false,
      tasks: [],
    },
    {
      title: 'READY FOR DEPLOY',
      showInput: false,
      tasks: [],
    },
  ];

  peopleList: any[] = [];
  sprintData: any[] = [];
  ss: any[] = [];
  errorMessage = '';
  sprints: any;
  
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private toast: ToastrService,
    private srv: DataServiceService,
    private fullScreenService: DataServiceService,
    private storageSrv: StorageService
  ) {
    this.srv.peoples.subscribe((people) => {
      this.peopleList = people.map((person) => ({
        ...person,
      }));
    });
    this.fullScreenService.isFullScreen$.subscribe((isFullScreen) => {
      this.isFullScreen = isFullScreen;
    });
  }

  // sprint: Sprint | null = null;
  ngOnInit(): void {
    console.log('bee', this.srv.isLoggedin.value);
    // this.loadColumnsFromLocalStorage();
    this.filteredColumns = [...this.columns];
    console.log('oo', this.filteredColumns);
    this.getPipelinesToLocalStorage();

    const savedPeopleList = localStorage.getItem('addPeopleList');
    if (savedPeopleList) {
      this.peopleList = JSON.parse(savedPeopleList);
    }
    this.flag = true;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log('Itemsb:', this.pipeLine);


    const projects = localStorage.getItem('projects');
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      let activeProject = parsedProjects.find(
        (project: Project) => project.isSelected === true
      );

      if (activeProject) {
        // this.sprints = activeProject.sprints;
        if (activeProject) {
          this.sprints = activeProject.sprints;

          console.log('x', this.sprints);

          const selectedSprint = this.sprints
            .map((sprint: any) => {
              if (sprint.isSprintSelected) {
                return sprint;
              }
              return null; // Return null for non-matching items
            })
            .filter((sprint: null) => sprint !== null); // Filter out null values

         

          const recentPipeline = selectedSprint[0].pipelines;
          recentPipeline.length=0
          recentPipeline.length = 0; // Clear the existing array
          recentPipeline.push(...this.pipeLine);
        }
        console.log('ttbb', parsedProjects);
         localStorage.setItem('projects', JSON.stringify(parsedProjects));
      }
      console.log('Updatedd parsedProjects:', activeProject);
    }
    // ***************************************************
  }
  getPipelinesToLocalStorage() {
    const projects = localStorage.getItem('projects');
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      let activeProject = parsedProjects.find(
        (project: Project) => project.isSelected === true
      );

      if (activeProject) {
        // this.sprints = activeProject.sprints;
        if (activeProject) {
          this.sprints = activeProject.sprints;

          console.log('xv', this.sprints);

          const selectedSprint = this.sprints
            .map((sprint: any) => {
              if (sprint.isSprintSelected) {
                return sprint;
              }
              return null; // Return null for non-matching items
            })
            .filter((sprint: null) => sprint !== null); // Filter out null values
          this.pipeLine = this.columns;

          const sprint = selectedSprint;
          console.log('tt', sprint[0].pipelines);
          this.pipeLine = sprint[0].pipelines;
          console.log('ttt', this.pipeLine);

          console.log('Filtered Pipelines:', this.pipeLine);
          // this.pipeLine = selectedSprint;
        }
      } else {
        console.log('No active project found');
      }
    } else {
      console.log('No projects found in localStorage');
    }
  }

  moveToTop(task: any, column: any) {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);
      column.tasks.unshift(task);
    }
    // this.saveColumnsToLocalStorage();
  }

  moveToBottom(task: any, column: any) {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);

      column.tasks.push(task);
    }
    // this.saveColumnsToLocalStorage();
  }

  trackByFn(index: number, item: any): any {
    return item;
  }

  addColumn() {
    this.add = true;
    this.plus = false;
  }
  cancelColumn() {
    this.add = false;
    this.plus = true;
    this.titleInput = '';
    this.errorMessage = '';
  }


  saveColumn() {
    // Check if the title input is empty
    if (!this.titleInput || this.titleInput.trim() === '') {
      this.toast.error('Column title cannot be empty');
      return;
    }
  
    // Check for duplicate column titles
    const isDuplicate = this.pipeLine.some((col: { title: any; }) => col.title === this.titleInput.trim());
    if (isDuplicate) {
      this.toast.error('Column title already exists');
      return;
    }
  
    // Add the new column to the columns array
    const newColumn = {
      title: this.titleInput.trim(),
      showInput: false,
      tasks: [],
    };
    this.pipeLine.push(newColumn);
    
    // Clear the input field and error message
    this.titleInput = '';
    this.errorMessage = '';
  
    // Update the pipeline
    this.pipeLine = [...this.pipeLine];
    // Save the updated columns to local storage
    this.saveColumnsToLocalStorage();

    this.add = false;
    this.plus = true;
  }
  saveColumnsToLocalStorage() {
    console.log("ppppipeLineppp",this.pipeLine)
    const projects = localStorage.getItem('projects');
    if (projects) {
      const parsedProjects = JSON.parse(projects);
      let activeProject = parsedProjects.find(
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
          .filter((sprint: null) => sprint !== null);
  
        if (selectedSprint.length > 0) {
          selectedSprint[0].pipelines = [...this.pipeLine];
          localStorage.setItem('projects', JSON.stringify(parsedProjects));
        }
      }
    }
  }
  create_issue(i: number) {
    this.columns.forEach((item: any, ind: any) => {
      item.showInput = ind === i;
    });
  }



  filterByAssignee(assignee: string) {
    const normalizedAssignee = assignee.trim().toLowerCase();

    this.filteredColumns = this.pipeLine.map((column: any) => {
      const filteredTasks = column.tasks.filter(
        (task: any) => task.Assign.trim().toLowerCase() === normalizedAssignee
      );

      return {
        ...column,
        tasks: filteredTasks,
      };
    });

    this.flag = false;
  }

  clearFilter() {
    this.flag = true;
    console.log('lll');
    // this.loadColumnsFromLocalStorage();
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addPeople() {
    const dialogRef = this.dialog.open(AddPeopleDialogComponent, {
      maxWidth: '26vw',
      height: '38vh',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleFullScreen() {
    this.iconChange = !this.iconChange;
    this.fullScreenService.setFullScreen(!this.isFullScreen);
  }
}
