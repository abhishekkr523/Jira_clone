import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';
import { Project } from '../../../user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit{

  constructor(private service : DataServiceService){}
  selectedProject: Project | null = null;
  
  // projectName:any
   ngOnInit(): void {
      //  this.service.projectNameSubject.subscribe((data:any)=>{
      //   console.log('projectName',data)
      //    this.projectName=data
      //  })
        
    this.service.selectedProjectSubject.subscribe((project:Project | null) => {
      if (project) {
        // console.log('tarun',project);
        this.selectedProject = project;
      }
     
    })


       
}}
