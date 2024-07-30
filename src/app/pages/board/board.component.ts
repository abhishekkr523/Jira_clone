import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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
  titleInput: any;
  createIssue: boolean = false;

  columns = [
    {
      title: 'TO DO',
      showInput: false,
      tasks: [
        {
          taskName: 'John Doe',
          project_name: 'Developer',
          assignee: 'Abhishek kummar',
        },
        {
          taskName: 'John Doe',
          project_name: 'Developer',
          assignee: 'krishna rai',
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

  ngOnInit(): void {
    this.loadColumnsFromLocalStorage();
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
    // this.createIssue = true;
    this.columns.forEach((item, ind) => {
      item.showInput = ind === i;
      // console.log(`${ind}>>${ind===i}`)
    });
    console.log(i);
  }
  create() {
    this.createIssue = false;
  }

  saveColumnsToLocalStorage() {
    localStorage.setItem('columns', JSON.stringify(this.columns));
  }

  loadColumnsFromLocalStorage() {
    if (typeof Storage !== 'undefined') {
      const savedColumns = localStorage.getItem('columns');
      if (savedColumns) {
        this.columns = JSON.parse(savedColumns);
      }
    }
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
