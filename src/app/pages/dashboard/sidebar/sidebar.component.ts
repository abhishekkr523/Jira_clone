import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(private service : DataServiceService){}
  
  
  projectName:any
  projects: any[] = [];
   ngOnInit(): void {
       this.service.projectNameSubject.subscribe((data:any)=>{
        console.log('projectName',data)
         this.projectName=data
       })




        if(typeof(Storage) !== 'undefined') {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      }  
}


}
}