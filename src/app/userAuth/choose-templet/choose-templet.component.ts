import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-templet',
  templateUrl: './choose-templet.component.html',
  styleUrl: './choose-templet.component.css'
})
export class ChooseTempletComponent {

  selectedBox: number | null = null;
  buttonVisible: boolean = false;

  selectBox(boxNumber: number): void {
    this.selectedBox = boxNumber;
    this.buttonVisible = true;
  }

  goWelcomePage()
  {
    console.log('welcome')
  }
}
