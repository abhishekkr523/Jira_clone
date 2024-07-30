import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../service/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

constructor(private service : DataServiceService){}


projectName:any
 ngOnInit(): void {
    //  this.service.projectNameSubject.subscribe((data)=>{
    //    this.projectName=data
    //  })
 }

}
