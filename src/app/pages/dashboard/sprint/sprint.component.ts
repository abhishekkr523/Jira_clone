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
  selectProject: { sprints: Sprint[]; [key: string]: any } = { sprints: [] };
  // projects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };
  // importantProjects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };

  ngOnInit(): void {
    if (typeof Storage !== 'undefined') {
      const saveSprint = localStorage.getItem('selectedProject');

      const projects = JSON.parse(
        localStorage.getItem('projects') || '[]'
      ) as Project[];
      const importantProjects = JSON.parse(
        localStorage.getItem('importantProjects') || '[]'
      ) as Project[];
      if (saveSprint)
        try {
          this.selectProject = JSON.parse(saveSprint);
          if (!Array.isArray(this.selectProject.sprints)) {
            this.selectProject.sprints = [];
          }
        } catch (error) {
          console.error(
            'Error parsing saved sprints from local storage',
            error
          );
          this.selectProject = { sprints: [] };
        }

      // Ensure selectProject contains projectId
      const projectId = this.selectProject['projectId']; // Use bracket notation

      // Find the current project in projects and importantProjects arrays
      const projectFromProjects = projects.find(
        (p: Project) => p.projectId === projectId
      );
      const projectFromImportantProjects = importantProjects.find(
        (p: Project) => p.projectId === projectId
      );

      // Merge the found project data into selectProject
      this.selectProject = {
        ...this.selectProject,
        ...(projectFromProjects || {}),
        ...(projectFromImportantProjects || {}),
      };
      // console.log('bahubali',this.selectProject.sprints)
    }
  }

  getNextSprintName(): string {
    const sprintCount = this.selectProject.sprints.length + 1;
    return `Sprint ${sprintCount}`;
  }
  createSprint() {
    const newSprint: Sprint = {
      sprintName: this.getNextSprintName(),
      sprintId: Date.now(),
      startDate: new Date(),
      duration: 0,
      endDate: new Date(),
      summary: '',
      tasks: [],
      pipelines: this.columns,
    };
    // this.dataService.storePipeline.subscribe((res) => {
    //   newSprint.pipelines.push(res);
    //   console.log('nn', res);
    // });
    this.selectProject.sprints.push(newSprint);
    this.toast.success('Sprint created successfully');

    // console.log('tarun', this.sprints)
    // localStorage.setItem('selectedProject', JSON.stringify(this.selectProject));
    this.saveToLocalStorage();
  }

  openEditDialog(sprint: Sprint) {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '500px',
      height: '500px',
      data: { sprint: { ...sprint } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.selectProject.sprints.findIndex(
          (s) => s.sprintId === sprint.sprintId
        );
        if (index !== -1) {
          this.selectProject.sprints[index] = result;
          // localStorage.setItem('selectedProject', JSON.stringify(this.selectProject));
          this.saveToLocalStorage();
        }
      }
    });
  }

  // delete sprint
  openDeleteDialog(sprint: Sprint) {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { message: 'Are you sure you want to delete this sprint?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSprint(sprint);
      }
    });
  }

  deleteSprint(sprint: Sprint) {
    this.selectProject.sprints = this.selectProject.sprints.filter(
      (s) => s.sprintId !== sprint.sprintId
    );
    // localStorage.setItem('selectedProject', JSON.stringify(this.selectProject));
    this.saveToLocalStorage();
  }

  //save local storage

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

  // sprint bacllock to board

  startSprint(sprint: any) {
    this.storeService.setSprint(sprint);
    console.log('tarun', sprint);
    this.selectedSprintIds = sprint.sprintId;

    const getSelectedProject = localStorage.getItem('selectedProject');
    if (getSelectedProject) {
      const parseProject = JSON.parse(getSelectedProject);
      this.project = parseProject;
      console.log('jj', this.project.projectName);
    }

    const findSprint = this.project.sprints.find(
      (sprint: any) => sprint.sprintId === this.selectedSprintIds
    );
    // console.log('vvvv', findSprint);

    localStorage.setItem('selectedSprint', JSON.stringify([findSprint]));

    const sprintStore = (sprint.pipelines = this.columns);
    // localStorage.setItem('selectedSprint', JSON.stringify([sprint]));
    this.router.navigate(['/dashboard'], {
      queryParams: { id: sprint.sprintId },
    });
  }



  // full screen
  //full screen

  isFullScreen = false;

  iconChange: boolean = false;

  toggleFullScreen() {
    this.iconChange = !this.iconChange;
    this.dataService.setFullScreen(!this.isFullScreen);
  }
}
