import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faCancel, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../../../../service/data-service.service';
import { StorageService } from '../../../../service/storage.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Issue, Project } from '../../../../user.interface';
import { json } from 'stream/consumers';
@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css'
})
export class CreateProPopupComponent implements OnInit {
  cancel = faCancel



  coffie = faCoffee
  imageUrl: string | undefined

  Option = ['In progress', 'Done', 'Ready to deploy'];
  issue = ['Task', 'Bug', 'Story', 'Epic'];
  linkedIssue = ['blocks', 'is block by', 'clones', 'is cloned by', 'duplicates', 'is duplicated by', 'reviews', 'is reviewed by', 'causes', 'is caused by', 'related to'];
  status = ['To Do', 'In Progress', 'Ready to Deploy', 'Done']
  faCoffee: any;
  isVisible2: boolean = false
  registerProject!: FormGroup
  projects: string[] = []
  editorContent: string = ''
  isMinimized: boolean = false
  reporter = ['krishna', 'tarun', 'abhishek']
  issueArray: any[] = []

  constructor(private dialog: MatDialogRef<CreateProPopupComponent>, private serv: DataServiceService, private localStorageService: StorageService, private fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.registerProject = this.fb.group({
      ProjectName: ['', [Validators.required]],
      IssueType: ['', [Validators.required]],
      status: ['',],
      summary: ['', [Validators.required]],
      description: ['',],
      Assign: ['',],
      attachment: [''],
      Label: ['',],
      Parent: ['',],
      sprint: ['',],
      Time: ['',],
      Reporter: ['', [Validators.required]],
      LinkedIssue: ['',],
      CreateAnotherIssue: ['',],
    });
    this.getProjectsFromLocalStorage()
    let existingData = this.localStorageService.getItem('Issue');
    console.log(existingData)
    console.log(typeof existingData)
  }
  onSubmit() {
    if (this.registerProject.valid) {
      const formData = this.registerProject.value;

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem('Issue') || '[]');

      // Add the new form data to the existing data
      existingData.push(formData);

      // Store the updated array back to local storage
      localStorage.setItem('Issue', JSON.stringify(existingData));

      // Optionally reset the form after submission
      this.registerProject.reset();
    
    } else {
      console.log('Form is invalid');
      this.dialog.close();
    }
  }
  getProjectsFromLocalStorage() {
    if (typeof Storage !== 'undefined') {
      const projects: Project[] = this.localStorageService.getItem('projects')
      console.log(projects)
      this.projects = projects.map(project => project.projectName);

    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string
        this.registerProject.patchValue({
          attachment: this.imageUrl // Update the form control with the base64 string
        });

        // console.log("ImageUrl",this.imageUrl)
      };
    }
  }
  onCloseDialog(): void {
    this.serv.isVisible.next(false)
    this.serv.isVisible.subscribe((res) => {
      this.isVisible2 = res
    })
    this.dialog.close();
  }
  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }
}
