import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-templet',
  templateUrl: './choose-templet.component.html',
  styleUrl: './choose-templet.component.css'
})
export class ChooseTempletComponent {


  constructor(private router:Router){}
  selectedBox: number | null = null;
  buttonVisible: boolean = false;

  selectBox(boxNumber: number): void {
    this.selectedBox = boxNumber;
    this.buttonVisible = true;
  }

  goWelcomePage()
  {
 this.router.navigate(['welcomePage'])
    console.log('welcome')
  }
}
