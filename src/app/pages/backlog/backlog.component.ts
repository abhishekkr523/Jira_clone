import { Component } from '@angular/core';
import { TaskDetailsComponent } from '../board/task-details/task-details.component';
import { AddPeopleDialogComponent } from '../board/add-people-dialog/add-people-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataServiceService } from '../../service/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from 'express';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss'
})
export class BacklogComponent {}
// export class BacklogComponent {
//   add: boolean = false;
//   plus: boolean = true;
//   flag: boolean = true;
//   titleInput: any;
//   createIssue: boolean = false;
//   filteredColumns: any[] = []; // To store filtered columns
//   isFullScreen = false;


// iconChange: boolean = false;

//    columns = [
//     {
//       title: 'TO DO',
//       showInput: false,
//       tasks: [
//         {
//           taskName: 'ui design',
//           project_name: 'Jira_clone',
//           assignee: 'Tarun pareta',
//         },
//         {
//           taskName: 'use reactive form',
//           project_name: 'Jira_clone',
//           assignee: 'Abhishek kumar',
//         },
//         {
//           taskName: 'filter implementation',
//           project_name: 'Jira_clone',
//           assignee: 'Krishna rai',
//         },
//       ],
//     },
//     {
//       title: 'IN PROGRESS',
//       showInput: false,
//       tasks: [],
//     },
//     {
//       title: 'DONE',
//       showInput: false,
//       tasks: [],
//     },
//     {
//       title: 'READY FOR DEPLOY',
//       showInput: false,
//       tasks: [],
//     },
//   ];

//   peopleList: any[] = [];
//   constructor(
//     public dialog: MatDialog,
//     private router: Router,
//     private srv: DataServiceService,private fullScreenService:DataServiceService
//   ) {this.srv.peoples.subscribe((people) => {
//     this.peopleList = people.map((person) => ({
//       ...person,
//       color: this.getRandomColor(),
//     }));
//   });
//   this.fullScreenService.isFullScreen$.subscribe(isFullScreen => {
//     this.isFullScreen = isFullScreen;
//   });
// }
//   // ngOnInit(): void {
    
//   //   this.loadColumnsFromLocalStorage();
//   //   // this.filteredColumns = [...this.columns]; // Initialize filteredColumns
//   //   // this.srv.peoples.subscribe((people) => {
//   //   //   this.peopleList = people.map((person) => ({
//   //   //     ...person,
//   //   //     color: this.getRandomColor(),
//   //   //   }));
//   //   // });

//   //   const savedPeopleList = localStorage.getItem('addPeopleList');
//   //   if (savedPeopleList) {
//   //     this.peopleList = JSON.parse(savedPeopleList);
//   //   }

//   //   this.srv.columns.next(this.columns);
//   //   console.log("ngColumns",this.columns)
//   // }

//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
  
//   drop(event: CdkDragDrop<any[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     } else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex
//       );
//     }
//     this.saveColumnsToLocalStorage();
//   }

//   moveToTop(task: any, column: any) {
//     const index = column.tasks.indexOf(task);
//     if (index > -1) {
//       column.tasks.splice(index, 1);
//       column.tasks.unshift(task);
//     }
//     this.saveColumnsToLocalStorage();
//   }

//   moveToBottom(task: any, column: any) {
//     const index = column.tasks.indexOf(task);
//     if (index > -1) {
//       column.tasks.splice(index, 1);
//       column.tasks.push(task);
//     }
//     this.saveColumnsToLocalStorage();
//   }

//   trackByFn(index: number, item: any): any {
//     return item;
//   }

//   addColumn() {
//     this.add = true;
//     this.plus = false;
//   }
//   cancelColumn() {
//     this.add = false;
//     this.plus = true;
//   }

//   saveColumn() {
//     if (this.titleInput.trim()) {
//       this.columns.push({
//         title: this.titleInput,
//         showInput: false,
//         tasks: [],
//       });
//       this.titleInput = '';
//       this.add = false;
//     }
//     this.plus = true;
//     this.srv.columns.next(this.columns);
//     this.srv.columns.subscribe((abc) => {
//       console.log('oo', abc);
//     });
//   }

//   create_issue(i: number) {
//     this.columns.forEach((item, ind) => {
//       item.showInput = ind === i;
//     });
//   }

//   create() {
//     this.createIssue = false;
//   }

//   filterByAssignee(assignee: string) {
//     console.log("assignee",assignee);
//     const normalizedAssignee = assignee.trim().toLowerCase();

//     this.filteredColumns = this.columns.map((column) => ({
//       ...column,
//       tasks: column.tasks.filter(
//         (task) => task.assignee.trim().toLowerCase() === normalizedAssignee
//       ),
//     }));
//     console.log("filtcol",this.filteredColumns);
//     console.log("columns",this.columns);
//     // this.columns=this.filteredColumns
//     this.flag = false;
//   }
//   clearFilter() {
//     this.flag = true;
//     console.log('lll');
//     this.loadColumnsFromLocalStorage();
//   }

//   saveColumnsToLocalStorage() {
//     localStorage.setItem('columns', JSON.stringify(this.columns));
//   }

//   loadColumnsFromLocalStorage() {
//     if (typeof Storage !== 'undefined') {
//       const savedColumns = localStorage.getItem('columns');
//       if (savedColumns) {
//         this.columns = JSON.parse(savedColumns);
//         this.filteredColumns = [...this.columns]; // Initialize filteredColumns
//         if (typeof Storage !== 'undefined') {
//           const savedColumns = localStorage.getItem('columns');
//           if (savedColumns) {
//             this.columns = JSON.parse(savedColumns);
//           }
//         }
//         console.log('ll', this.columns);
//       }
//     }
//   }



//   openDialog(data: any) {
//     const dialogRef = this.dialog.open(TaskDetailsComponent, {
//       width: '90vw',
//       height: '90vh',
//       maxWidth: 'none',
//       panelClass: 'custom-dialog-container',
//       data: data,
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
//   addPeople() {
//     const dialogRef = this.dialog.open(AddPeopleDialogComponent, {
//       maxWidth: '26vw',
//       height: '58vh',
//       panelClass: 'custom-dialog-container',
//       // data: data,
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }
 
// //full screen



// toggleFullScreen() {
//   this.iconChange = !this.iconChange;
//     this.fullScreenService.setFullScreen(!this.isFullScreen);
//   }
// }

