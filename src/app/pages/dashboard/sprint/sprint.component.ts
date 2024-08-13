import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  faCancel,
  faListDots,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { CompletePopUpComponent } from './complete-pop-up/complete-pop-up.component';
// import { EditPopUpComponent } from './edit-pop-up/edit-pop-up.component';
import { Project, Sprint } from '../../../user.interface';
import { ToastrService } from 'ngx-toastr';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { DataServiceService } from '../../../service/data-service.service';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss',
})
export class SprintComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private dataService: DataServiceService,
    private storeService: StorageService
  ) {
    this.dataService.isFullScreen$.subscribe((isFullScreen) => {
      this.isFullScreen = isFullScreen;
    });
  }

  sprints: Sprint[] = [];
  selectProject!: Project
  // projects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };
  // importantProjects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };

  ngOnInit(): void {
    if (typeof Storage !== 'undefined') {
      const saveSprint = JSON.parse(localStorage.getItem('selectedProject') ||'[]');
      
      this.selectProject={...saveSprint,sprints:saveSprint[0].sprints||[]}
      const projects = JSON.parse(
        localStorage.getItem('projects') || '[]'
      ) as Project[];
      
      // if (saveSprint)
  
      // Merge the found project data into selectProject
     
    }
    this.getSprint()
  }

  getNextSprintName(): string {
    const sprintCount = this.selectProject.sprints.length + 1;
    return `Sprint ${sprintCount}`;
  }
  newSprint!:Sprint
  createSprint() {
    const projects = JSON.parse(localStorage.getItem('selectedProject') || '[]')
    const sprint = projects.sprints

    if (projects) {
      const newSprint: Sprint = {
        sprintName: this.getNextSprintName(),
        sprintId: Date.now(),
        startDate: new Date(),
        duration: 0,
        endDate: new Date(),
        summary: '',
        tasks: [],
      };

      this.openEditDialog(newSprint)
      
      // this.saveToLocalStorage(newSprint)
    } else {

      this.toast.error('Please select a project');
    }

  }
  getSprint(){
    const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];
  // console.log(projects.find((p:Project)=> p.isSelected))
  let SelectedProject=projects.find((p:Project)=> p.isSelected)
  if(SelectedProject){
    this.selectProject=SelectedProject

  }
  }

  openEditDialog(sprint: Sprint) {
    let checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]')

    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '500px',
      height: '500px',
      data: { sprint: { ...sprint } },
    });
    // conssole.log(sprint)
    
    dialogRef.afterClosed().subscribe((result) => {
      // this.saveToLocalStorage(sprint)
this.getSprint()
      
    });
  }

  openDeleteDialog(sprint: Sprint) {
    const confirmationMessage = `Are you sure you want to delete this <strong>${sprint.sprintName}</strong>?`;
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { message: confirmationMessage },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSprint(sprint);
      }
    });
  }

  deleteSprint(sprint: Sprint) {
    let checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]')

    checkProject[0].sprints = this.selectProject.sprints.filter(
      (s) => s.sprintId !== sprint.sprintId
    );
    // this.saveToLocalStorage();
  }

  //save local storage

  saveToLocalStorage(sprint:Sprint) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]') as Project[];

projects.forEach(project => {
  // Check if the project is selected
  if (project.isSelected) {
    // Push the new sprint object to the sprints array
    project.sprints.push(sprint);

  }
});
localStorage.setItem('projects',JSON.stringify(projects))
this.getSprint()
  }

  // sprint bacllock to board

  startSprint(sprint: any) {
    this.storeService.setSprint(sprint);
  }

  isFullScreen = false;

  iconChange: boolean = false;

  toggleFullScreen() {
    this.iconChange = !this.iconChange;
    this.dataService.setFullScreen(!this.isFullScreen);
  }
}