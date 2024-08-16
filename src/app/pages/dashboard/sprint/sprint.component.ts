

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
import { Router } from '@angular/router';
import { AddPeopleDialogComponent } from '../../board/add-people-dialog/add-people-dialog.component';
import { profileEnd } from 'console';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.scss',
})
export class SprintComponent implements OnInit {
  project: any;
  selectedSprintIds: any;
  IdOfSelectedProject: any;
  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private dataService: DataServiceService,
    private storeService: StorageService,
    private router: Router
  ) {
    this.dataService.isFullScreen$.subscribe((isFullScreen) => {
      this.isFullScreen = isFullScreen;
    });
  }
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
  sprints: Sprint[] = [];
  selectProject!: Project;

  ngOnInit(): void {

    this.getSprint();
  }

  getNextSprintName(): string {
    const sprintCount = this.selectProject.sprints.length + 1;
    return `Sprint ${sprintCount}`;
  }
  createSprint() {
    const projects = this.storeService.getProjects()
    let SelectedProject = projects.find((p: Project) => p.isSelected)

    if (SelectedProject) {
      const newSprint: Sprint = {
        sprintName: this.getNextSprintName(),
        sprintId: Date.now(),
        startDate: new Date(),
        duration: 0,
        endDate: new Date(),
        summary: '',
        isSprintSelected: false,
        pipelines: this.columns,

      };
      const projects = this.storeService.getProjects()
      let SelectedProject = projects.find((p: Project) => p.isSelected == true)
      let check = SelectedProject?.sprints.find((s: Sprint) => s.sprintId == newSprint.sprintId)
      if (!check) {
        this.openEditDialog(newSprint)
        // this.saveToLocalStorage(newSprint)

      }
      else {
        console.log("Same Sprint id Generated")
      }

      // this.openEditDialog(newSprint);

      // this.saveToLocalStorage(newSprint)
    } else {
      this.toast.error('Please select a project');
    }
  }

  openEditDialog(sprint: Sprint) {
    const projects = this.storeService.getProjects()
    let SelectedProject = projects.find((p: Project) => p.isSelected)
    let check = SelectedProject?.sprints.some((s: Sprint) => s.sprintId == sprint.sprintId)
    // console.log(check)
    if (check) {
      const dialogRef = this.dialog.open(EditdialogComponent, {
        width: '500px',
        height: '500px',
        data: { sprint: { ...sprint }, isTrue: false },
      });


      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.saveToLocalStorage(result)
          this.getSprint()
        }


      });
    }
    else {
      const dialogRef = this.dialog.open(EditdialogComponent, {
        width: '500px',
        height: '500px',
        data: { sprint: { ...sprint }, isTrue: true },
      });


      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.saveToLocalStorage(result)
          this.getSprint()
        }


      });
    }

  }

  openDeleteDialog(sprint: Sprint) {
    const confirmationMessage = `Are you sure you want to delete this <strong>${sprint.sprintName}</strong>?`;
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { message: confirmationMessage },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSprint(sprint);
        this.toast.success('Sprint deleted')

      }
      else{
        this.toast.info('Sprint is not deleted.')
      }
    });
  }
  addTeam() {
    this.dialog.open(AddPeopleDialogComponent, {
      data: {},
    });

  }

  deleteSprint(sprint: Sprint) {
    const projects = this.storeService.getProjects()
    projects.forEach((project: { isSelected: boolean; sprints: Sprint[] }) => {
      // Check if the project is selected
      if (project.isSelected) {
        // Find the index of the sprint to delete
        const sprintIndex = this.selectProject.sprints.findIndex(
          (s) => s.sprintId === sprint.sprintId
        );


        // If the sprint exists, remove it
        if (sprintIndex !== -1) {
          this.selectProject.sprints = [
            ...this.selectProject.sprints.slice(0, sprintIndex),
            ...this.selectProject.sprints.slice(sprintIndex + 1)
          ];

        }

        // Update the project in the projects array
        project.sprints = this.selectProject.sprints;

        this.storeService.setProjects(projects)
      }
    });

  }

  getSprint() {
    const projects = this.storeService.getProjects()
    let SelectedProject = projects.find((p: Project) => p.isSelected)
    if (SelectedProject) {
      this.selectProject = SelectedProject

    }
  }


  //save local storage

  saveToLocalStorage(sprint: Sprint) {
    const projects = this.storeService.getProjects()

    projects.forEach(project => {
      // Check if the project is selected
      if (project.isSelected) {
        // Check if the sprint already exists in the project.sprints array
        const existingSprintIndex = project.sprints.findIndex(existingSprint => existingSprint.sprintId === sprint.sprintId);

        if (existingSprintIndex !== -1) {
          // Update the existing sprint
          project.sprints[existingSprintIndex] = { ...project.sprints[existingSprintIndex], ...sprint };
          this.storeService.setProjects(projects)
          this.toast.success('Sprint Updated successfully')

        } else {
          // Push the new sprint object to the sprints array
          project.sprints.push(sprint);
          this.storeService.setProjects(projects)
          this.toast.success('Sprint Created successfully')

        }
      }
    });
    this.getSprint()
  }

  // sprint bacllock to board

  startSprint(sprint: any) {
    const projects = this.storeService.getProjects()

    if (projects) {


      let activeProject = projects.find(
        (project: Project) => project.isSelected === true
      );

      if (activeProject) {
        // Set isSprintSelected of all sprints to false
        activeProject.sprints.forEach((spri: Sprint) => {
          spri.isSprintSelected = false;
        });

        // Find the sprint that matches the given sprintId and set isSprintSelected to true
        let selectedSprint = activeProject.sprints.find(
          (spri: Sprint) => spri.sprintId === sprint.sprintId
        );

        if (selectedSprint) {
          selectedSprint.isSprintSelected = true;
        }
        this.storeService.setProjects(projects)
        this.getSprint()
        this.toast.success("Sprint started")
        // const projects = JSON.parse(localStorage.getItem('projects') || '[]')

      }
    }
  }

  isFullScreen = false;

  iconChange: boolean = false;

  toggleFullScreen() {
    this.iconChange = !this.iconChange;
    this.dataService.setFullScreen(!this.isFullScreen);
  }
}
