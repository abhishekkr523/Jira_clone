import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faCancel, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataServiceService } from '../../../../service/data-service.service';
import { StorageService } from '../../../../service/storage.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-pro-popup',
  templateUrl: './create-pro-popup.component.html',
  styleUrl: './create-pro-popup.component.css'
})
export class CreateProPopupComponent implements OnInit{
  cancel=faCancel

  
  
  coffie=faCoffee
  imageUrl: string|undefined
  
  Option = ['In progress', 'Done', 'Ready to deploy'];
  issue=['Task','Bug','Story','Epic'];
  linkedIssue=['blocks','is block by','clones','is cloned by','duplicates','is duplicated by','reviews','is reviewed by','causes','is caused by','related to'];
  status=['To Do','In Progress','Ready to Deploy','Done']
  faCoffee: any;
  isVisible2:boolean=false

  registerProject!:FormGroup
  projects=['pro1','pro2']
  editorContent:string=''
  isMinimized:boolean=false


  constructor(private dialog:MatDialogRef<CreateProPopupComponent>,private serv:DataServiceService,private localStorageService:StorageService,private fb:FormBuilder){
    
  
}
ngOnInit(): void {
  this.registerProject = this.fb.group({
    ProjectName: ['',[Validators.required]],
    IssueType: ['', [Validators.required]],
    status: ['', ],
    summary: ['', [Validators.required]],
    description: ['', ],
    Assign: ['', ],
    Label: ['', ],
    Parent: ['', ],
    sprint: ['', ],
    Time:['',],
    Reporter:['',[Validators.required]],
    LinkedIssue:['',],
    CreateAnotherIssue:['',],
  });
}
  onSubmit(){
     console.log("asdkfjakjs")
     if (this.registerProject.valid) {
      const formData = this.registerProject.value; // Get the form value
      this.localStorageService.setItem('ProjectDetail', formData);1 // Store form value in local storage
      this.dialog.close();
      console.log('Project Detail:', formData);
    } else {
      console.log('Form is invalid');
      this.dialog.close();
    }
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if(file){
      const reader:FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string
        
        // console.log("ImageUrl",this.imageUrl)
      };
    }
    }
    onCloseDialog():void{
      this.serv.isVisible.next(false)
      this.serv.isVisible.subscribe((res)=>{
        this.isVisible2=res
      })
      this.dialog.close();
    }
    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
    }
}
