import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';
import { Project } from '../../../user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(private service: DataServiceService) {}
  selectedProject: Project | null = null;

   ngOnInit(): void {
    console.log("first",this.projectName)
    this.service.projectNameSubject.subscribe((data)=>{
      console.log('projectName asdlkjfhlakjshdf',data)
      this.projectName=data
      console.log("last",this.projectName)
    })


       
   
    this.service.selectedProjectSubject.subscribe((project:Project | null) => {
      if (project) {
        // console.log('tarun',project);
        this.selectedProject = project;
      }
     
    })
  }

}
