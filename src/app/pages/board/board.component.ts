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
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
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
    this.getPipelinesToLocalStorage();
    const saveSprint = localStorage.getItem('selectedProject');
    if (saveSprint) {
      this.selectProject = JSON.parse(saveSprint);
    }
    const selectproj = localStorage.getItem('selectedProject');
    console.log('selectedproject', selectproj);
    const getSelectedSprint = localStorage.getItem('selectedSprint');

    this.srv.storePipeline.next(this.columns);
    const storedPipelines = localStorage.getItem('pipelines');
    if (storedPipelines) {
      this.columns = JSON.parse(storedPipelines);
    }

    const savedPeopleList = localStorage.getItem('addPeopleList');
    if (savedPeopleList) {
      this.peopleList = JSON.parse(savedPeopleList);
    }

    this.srv.columns.next(this.columns);
    console.log('ngColumns', this.columns);

    const getSprintData1 = this.storageSrv.sprintSource.value;
    const getSprintData2 = getSprintData1?.tasks || []; // Ensure it's an array even if undefined
    console.log('gg', getSprintData2);

    // Log all tasks and their statuses
    getSprintData2.forEach((task) =>
      console.log('Task Status:', task.status, 'Task Name:', task.taskName)
    );

    // Function to filter tasks by status
    const filterTasksByStatus = (status: string) =>
      from(getSprintData2).pipe(
        filter((task) => task.status === status),
        toArray()
      );

    // Filter and assign tasks for "TO DO"
    filterTasksByStatus('To Do').subscribe((res) => {
      console.log('TO DO tasks', res);
      this.columns[0].tasks = [...this.columns[0].tasks, ...res]; // Assign to TO DO column
    });

    // Filter and assign tasks for "IN PROGRESS"
    filterTasksByStatus('In Progress').subscribe((res) => {
      console.log('IN PROGRESS tasks', res);
      this.columns[1].tasks = [...this.columns[1].tasks, ...res]; // Assign to IN PROGRESS column
    });

    // Filter and assign tasks for "DONE"
    filterTasksByStatus('Done').subscribe((res) => {
      console.log('DONE tasks', res);
      this.columns[2].tasks = [...this.columns[2].tasks, ...res]; // Assign to DONE column
    });

    // Filter and assign tasks for "READY FOR DEPLOY"
    filterTasksByStatus('Ready to Deploy').subscribe((res) => {
      console.log('READY FOR DEPLOY tasks', res);
      this.columns[3].tasks = [...this.columns[3].tasks, ...res]; // Assign to READY FOR DEPLOY column
    });

    // update pipenine after create issue
    this.storageSrv.flag.subscribe(res=>{
      if(res){
        this.getPipelinesToLocalStorage();
      }
    })
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
    // this.saveColumnsToLocalStorage();
    console.log('Itemsa:', this.pipeLine);
    this.pipeLine = this.pipeLine.map((column: { tasks: any[] }) => {
      if (!Array.isArray(column.tasks)) {
        // If tasks is not an array, convert it to an array
        column.tasks = [column.tasks];
      }
      return column;
    });
    console.log('Itemsb:', this.pipeLine);
    
    const getSelectedSprint=localStorage.getItem('selectedSprint')
    if(getSelectedSprint){
      const parseSelectedSprint=JSON.parse(getSelectedSprint)
      console.log('Items1', parseSelectedSprint[0].pipelines);
      if (parseSelectedSprint) {
        console.log('hii',this.pipeLine);
        parseSelectedSprint[0].pipelines=this.pipeLine;
        console.log('Items2:', parseSelectedSprint[0].pipelines);
        console.log('Items2..:', parseSelectedSprint);
        const a=parseSelectedSprint[0].pipelines
        localStorage.setItem('selectedSprint',JSON.stringify(parseSelectedSprint))
      }
    }
  }

  moveToTop(task: any, column: any) {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);
      column.tasks.unshift(task);
    }
    this.saveColumnsToLocalStorage();
  }

  moveToBottom(task: any, column: any) {
    const index = column.tasks.indexOf(task);
    if (index > -1) {
      column.tasks.splice(index, 1);

      column.tasks.push(task);
    }
    this.saveColumnsToLocalStorage();
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
  }
  saveToLocalStorage() {
    const projects = JSON.parse(
      localStorage.getItem('projects') || '[]'
    ) as Project[];
    const importantProjects = JSON.parse(
      localStorage.getItem('importantProjects') || '[]'
    ) as Project[];
    const projectId = this.selectProject['projectId']; // Use bracket notation

    // Update the `projects` and `importantProjects` arrays
    const updatedProjects = projects.map((p) =>
      p.projectId === projectId
        ? { ...p, sprints: this.selectProject.sprints }
        : p
    );

    const updatedImportantProjects = importantProjects.map((p) =>
      p.projectId === projectId
        ? { ...p, sprints: this.selectProject.sprints }
        : p
    );

    // Save updated arrays back to local storage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    localStorage.setItem(
      'importantProjects',
      JSON.stringify(updatedImportantProjects)
    );
    localStorage.setItem('selectedProject', JSON.stringify(this.selectProject));
  }

  saveColumn() {
    console.log('selected project', this.selectProject);
    const getSprint = localStorage.getItem('selectedSprint');
    if (getSprint) {
      const parseSprints = JSON.parse(getSprint);
      // console.log('parseSprints', parseSprints);

      parseSprints[0].pipelines.push({ title: this.titleInput, tasks: [] });
      // console.log('pipelines', pipelines);
      // pipelines.push({ title: 'abhi', task: [] });
      // this.pipeLine = pipelines[0];
      // console.log('gg', parseSprints[0]);
      const getSelectedProject = localStorage.getItem('selectedProject');
      if (getSelectedProject) {
        const parsepro = JSON.parse(getSelectedProject);
        const parseSprints = JSON.parse(getSprint);
        // console.log('parseSprints', parseSprints[0].sprintId);
        const getSprintInfo = parsepro.sprints.map((sprint: any) => {
          // console.log("hh",sprint)
          if (sprint.sprintId === parseSprints[0].sprintId) {
            console.log('hh', sprint);
            return {...sprint,pipelines:[...sprint.pipelines,{ title: this.titleInput, tasks: [] }]};
          }
          return sprint;
        });
        let data={...parsepro,sprints:getSprintInfo}
        console.log("hh",data);

        localStorage.setItem('selectedProject', JSON.stringify(data));

      }
      localStorage.setItem('selectedSprint', JSON.stringify(parseSprints));
      this.getPipelinesToLocalStorage();
    }
    this.add = false;
    this.plus = true;
  }
  getPipelinesToLocalStorage() {
    const currentSprint = localStorage.getItem('selectedSprint');

    // console.log("aa",currentSprint)
    if (currentSprint) {
      // console.log("aaa",currentSprint)
      const parsCurrentSprint = JSON.parse(currentSprint);
      console.log('aa', parsCurrentSprint);
      this.pipeLine = parsCurrentSprint[0].pipelines;
      console.log('xxx', this.pipeLine);
    }
  }
  
  // create_issue(i: number) {
  //   this.columns.forEach((item: any, ind: any) => {
  //     item.showInput = ind === i;
  //   });
  //   this.createIssue = true;
  // }

  // create() {
  //   this.createIssue = false;
  // }

//   filterByAssignee(assignee: string) {
//     console.log('assignee', assignee);
//     const normalizedAssignee = assignee.trim().toLowerCase();
// console.log("jjjpp",this.pipeLine)
//     this.filteredColumns = this.pipeLine.map((column: any) => ({
//       ...column,
//       tasks: column.tasks.filter(
//         (task: any) => task.assignee.trim().toLowerCase() === normalizedAssignee
//       ),
//     }));
//     console.log('filtcol', this.filteredColumns);
//     console.log('columns', this.columns);
//     // this.columns=this.filteredColumns
//     this.flag = false;
//   }
filterByAssignee(assignee: string) {
  console.log('assignee', assignee);
  const normalizedAssignee = assignee.trim().toLowerCase();
  console.log("jjjpp", this.pipeLine);

  this.filteredColumns = this.pipeLine.map((column: any) => {
    const filteredTasks = column.tasks
      .flat()
      .filter((task: any) => task.Assign.trim().toLowerCase() === normalizedAssignee);

    return {
      ...column,
      tasks: filteredTasks.length > 0 ? [filteredTasks] : [],
    };
  });

  console.log('filtcol', this.filteredColumns);
  console.log('columns', this.columns);
  // this.columns = this.filteredColumns;
  this.flag = false;
}

  clearFilter() {
    this.flag = true;
    console.log('lll');
    // this.loadColumnsFromLocalStorage();
  }

  saveColumnsToLocalStorage() {
    localStorage.setItem('columns', JSON.stringify(this.columns));
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
      height: '58vh',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //full screen

  //full screen

  toggleFullScreen() {
    this.iconChange = !this.iconChange;
    this.fullScreenService.setFullScreen(!this.isFullScreen);
  }
}
