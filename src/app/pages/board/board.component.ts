import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  add: boolean = false;
  plus: boolean = true;
  flag:boolean=true;
  titleInput: any;
  createIssue: boolean = false;
  filteredColumns : any[]= []; // To store filtered columns

  columns = [
    {
      title: 'TO DO',
      showInput: false,
      tasks: [
        {
          taskName: 'ui design',
          project_name: 'Jira_clone',
          assignee: 'Tarun pareta',
        },
        {
          taskName: 'use reactive form',
          project_name: 'Jira_clone',
          assignee: 'Abhishek kumar',
        },
        {
          taskName: 'filter implementation',
          project_name: 'Jira_clone',
          assignee: 'Krishna rai',
        },
      ],
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
  projects = [
    {
      projectId: '',
      projectName: '',
      sprints: [
        {
          sprintId: '',
          sprintName: '',
          tasks: [
            {
              taskId: '',
              taskName: '',
              description: '',
              assignee: '',
              status: '',
              storyPoints: '',
            },
          ],
        },
      ],
    },
  ];

  peoples = ["Abhishek kumar", "Krishna rai", "Tarun pareta"];

  ngOnInit(): void {
    this.loadColumnsFromLocalStorage();
    this.filteredColumns = [...this.columns]; // Initialize filteredColumns
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

  saveColumn() {
    if (this.titleInput.trim()) {
      this.columns.push({
        title: this.titleInput,
        showInput: false,
        tasks: [],
      });
      this.titleInput = '';
      this.add = false;
    }
    this.plus = true;
  }

  create_issue(i: number) {
    this.columns.forEach((item, ind) => {
      item.showInput = ind === i;
    });
  }

  create() {
    this.createIssue = false;
  }

  filterByAssignee(assignee: string) {
    console.log(assignee)
    const normalizedAssignee = assignee.trim().toLowerCase();

    this.filteredColumns = this.columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.assignee.trim().toLowerCase() === normalizedAssignee)
    }));
    console.log(this.filteredColumns);
    console.log(this.columns);
    // this.columns=this.filteredColumns
    this.flag=false;
  }
  clearFilter(){
    this.flag=true;
    console.log("lll")
    this.loadColumnsFromLocalStorage();

  }

  saveColumnsToLocalStorage() {
    localStorage.setItem('columns', JSON.stringify(this.columns));
  }

  loadColumnsFromLocalStorage() {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      this.columns = JSON.parse(savedColumns);
      this.filteredColumns = [...this.columns]; // Initialize filteredColumns
    }
    console.log("ll",this.columns)
  }

  constructor(public dialog: MatDialog) {}

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
}
