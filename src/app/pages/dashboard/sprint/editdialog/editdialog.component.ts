import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project, Sprint } from '../../../../user.interface';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../service/storage.service';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrl: './editdialog.component.css'
})
export class EditdialogComponent implements OnInit,AfterViewInit {
  weeks = [1, 2, 3, 4];
  selectedWeeks!: number | Date|string ;
  customWeeks: number | null = null;
  startDate!: Date | number;
  endDate!: Date |null
  registerProject!: FormGroup;
  sprint: Sprint;
  goal!:string
  today: Date = new Date();
  actionButton!:boolean

  constructor(
    private dialogRef: MatDialogRef<EditdialogComponent>,
    private fb: FormBuilder,
    private toast:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeServ:StorageService
  ) {
    this.sprint = data.sprint;
    this.endDate=this.sprint.endDate
    this.selectedWeeks=this.sprint.duration
    this.goal=this.sprint.summary
this.actionButton=data.isTrue
  }

  ngOnInit(): void {
    this.registerProject = this.fb.group({
      sprintName: [this.sprint.sprintName, [Validators.required]],
      startDate: [this.sprint.startDate, [Validators.required]],
      customWeeks: [this.sprint.startDate, [Validators.required]],
      duration: [this.sprint.duration, [Validators.required]],
      endDate: [this.sprint.endDate, [Validators.required]],
      summary: [this.sprint.summary]
    });
    this.calculateEndDate();
  }
  ngAfterViewInit(): void {
   
  }

  calculateEndDate(): void {
    
   let startDate= this.registerProject.value.startDate
   let selectedWeeks= this.registerProject.value.duration
   let customWeeks= this.registerProject.value.customWeeks

    let weeksToAdd = this.selectedWeeks === 'custom' && customWeeks ? customWeeks : selectedWeeks;
    if (typeof weeksToAdd === 'number' && weeksToAdd > 0) {
      this.endDate = new Date(startDate);
      this.endDate.setDate(this.endDate.getDate() + weeksToAdd * 7);
    } else {
      this.endDate = null;
    }
  }

  onWeeksChange() {
    this.calculateEndDate();
  }

  onCustomWeeksChange() {
    if (this.selectedWeeks === 'custom') {
      this.calculateEndDate();
    }
  }


  // save data
      onSave(sprint:Sprint){
        const projects = this.storeServ.getProjects()
        let SelectedProject = projects.find((p: Project) => p.isSelected==true)
        let check = SelectedProject?.sprints.find((s: Sprint) => s.sprintId == sprint.sprintId)
    if (this.registerProject.valid || !check) {
      const updatedSprint = {
        ...this.sprint,
        ...this.registerProject.value,
        endDate: this.endDate
      };

      // this.saveToLocalStoage(updatedSprint)
      this.dialogRef.close(updatedSprint);
      
      
    }
  }
 

  onCancel(): void {
    this.dialogRef.close();
   
  }
}