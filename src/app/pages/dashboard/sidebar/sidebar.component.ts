import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  constructor(private service : DataServiceService){}
  
  
  projectName:string=''
   ngOnInit(): void {
    console.log("first",this.projectName)
    this.service.projectNameSubject.subscribe((data)=>{
      console.log('projectName asdlkjfhlakjshdf',data)
      this.projectName=data
      console.log("last",this.projectName)
    })


       
}


}