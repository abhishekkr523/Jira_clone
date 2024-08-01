import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../service/data-service.service';
import { Project } from '../../user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  boardFullScreen = false;
constructor(private fullScreenService : DataServiceService){
  this.fullScreenService.isFullScreen$.subscribe(isFullScreen => {
    this.boardFullScreen = isFullScreen;
  });
}



 ngOnInit(): void {
  
 }

 

 

}
