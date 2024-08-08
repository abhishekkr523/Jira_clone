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
  selectProject: { sprints: Sprint[]; [key: string]: any } = { sprints: [] };
  // selectProject!:Project
  // projects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };
  // importantProjects: { sprints: Sprint[], [key: string]: any } = { sprints: [] };

  ngOnInit(): void {
    if (typeof Storage !== 'undefined') {
      const saveSprint = JSON.parse(localStorage.getItem('selectedProject') ||'[]');
      
      this.selectProject={...saveSprint,sprints:saveSprint[0].sprints||[]}
      const projects = JSON.parse(
        localStorage.getItem('projects') || '[]'
      ) as Project[];
      const importantProjects = JSON.parse(
        localStorage.getItem('importantProjects') || '[]'
      ) as Project[];
      if (saveSprint)
        try {
          // this.selectProject = JSON.parse(saveSprint);
          if (!Array.isArray(this.selectProject.sprints)) {
            this.selectProject.sprints = [];
            console.log('error')
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
      
      // this.selectProject=saveSprint ? JSON.parse(saveSprint) : [];
      // Merge the found project data into selectProject
      this.selectProject = {...this.selectProject}
      // console.log('bahubali',this.selectProject.sprints)
    }
  }

  getNextSprintName(): string {
    const sprintCount = this.selectProject.sprints.length + 1;
    return `Sprint ${sprintCount}`;
  }
  newSprint!:Sprint
  createSprint() {
    const checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]')
      if(checkProject.length>0){
      this.newSprint = {
        sprintName: this.getNextSprintName(),
        sprintId: Date.now(),
        startDate: new Date(),
        duration: 0,
        endDate: new Date(),
        summary: '',
        tasks: [],
      };
      console.log('selected Project',this.selectProject)
      this.selectProject.sprints.push(this.newSprint)
      console.log('selected Project',this.selectProject)
      console.log("sprint1",checkProject)
      checkProject[0]?.sprints?.push(this.newSprint);
      console.log('SPrint',checkProject)
  
      this.toast.success('Sprint created successfully');
  console.log(checkProject)
    
      this.saveToLocalStorage(checkProject);
    }
    else{
      this.toast.error("Please Select the Project.")
    }
       
  }

  openEditDialog(sprint: Sprint) {
    let checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]')

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
        console.log(result,"index")
        if (index !== -1) {
          // checkProject=this.selectProjec
          this.selectProject.sprints[index] = result;
          checkProject[0].sprints[index]=result
          console.log(checkProject)
          this.saveToLocalStorage(checkProject);
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
    let checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]')

    checkProject[0].sprints = this.selectProject.sprints.filter(
      (s) => s.sprintId !== sprint.sprintId
    );
    console.log(checkProject)
    this.selectProject={...checkProject,sprints:checkProject[0].sprints}
    localStorage.setItem('selectedProject', JSON.stringify(checkProject));
    // this.saveToLocalStorage();
  }

  //save local storage

  saveToLocalStorage(checkProject:any) {
    localStorage.setItem('selectedProject', JSON.stringify(checkProject));

    const projects = JSON.parse(
      localStorage.getItem('projects') || '[]'
    ) ;
    const importantProjects = JSON.parse(
      localStorage.getItem('importantProjects') || '[]'
    ) ;

    const projectId = this.selectProject[0].projectId// Use bracket notation
    console.log(projectId)
    const selectProjectId=projects.map((p:{projectId:number})=>p.projectId)
console.log(selectProjectId)
    // Update the `projects` and `importantProjects` arrays
    const updatedProjects = projects.map((p:Project) =>
      p.projectId === projectId
        ? { ...p, sprints: this.selectProject[0].sprints }
        : p
    );

    const updatedImportantProjects = importantProjects.map((p:Project) =>
      p.projectId === projectId
        ? [{ ...p, sprints: this.selectProject.sprints }]
        :[ p]
    );
    console.log(updatedProjects)

    // Save updated arrays back to local storage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    localStorage.setItem(
      'importantProjects',
      JSON.stringify(updatedImportantProjects)
    );
    // localStorage.setItem('selectedProject', JSON.stringify(this.selectProject));
    this.updateAllProjects()
  }
  updateAllProjects(): void {
    // Retrieve the existing AllProjects array from local storage
    let projectid:Number
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
const checkProject=JSON.parse(localStorage.getItem('selectedProject')||'[]');
const checkProjectid=allProjects.map((project: { projectId: number }) => project.projectId)
console.log(checkProjectid,"projectId")
const checkSelectProjectid=checkProject.map((project: { projectId: number }) => project.projectId)
console.log(checkSelectProjectid[0],"selectprojectid")
const allProjectid=checkProjectid.filter((project: { projectId: number }) => project.projectId===checkSelectProjectid[0])
console.log(allProjectid,"projectidsdafg")
// if(checkProject===checkProjectid){
//   console.log()
// }
console.log(checkProjectid,"checkProjectId")
    // Check if the selected project already exists in AllProjects
    const existingProjectIndex = allProjectid.some((project:Project) => project.projectId === checkProject.projectId);
    const existingProjectIndex2 = allProjects.findIndex((project: { projectId: number }) => project.projectId === checkProject[0].projectId);

console.log(existingProjectIndex2,"index of projecgts ")
    if (existingProjectIndex !== -1) {
      // If the project exists, update its data in AllProjects
      allProjects[existingProjectIndex2] = { ...allProjects[existingProjectIndex2] };
      console.log('Updated existing project in AllProjects:', allProjects[existingProjectIndex2]);
    } else {
      // If the project does not exist, add it to the array
      allProjects.push(checkProject);
      console.log('Added new project to AllProjects:', checkProject);
    }

  //   // Save the updated AllProjects array back to local storage
  //   localStorage.setItem('projects', JSON.stringify(allProjects));
  //   console.log('Updated AllProjects:', allProjects);
  }

  // sprint bacllock to board

  startSprint(sprint: any) {
    this.storeService.setSprint(sprint);
    console.log('tarun', sprint);
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