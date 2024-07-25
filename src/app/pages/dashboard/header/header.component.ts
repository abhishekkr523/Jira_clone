import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  activeLink: HTMLElement | null = null;

  setActive(event: Event){
    if (this.activeLink) {
      this.activeLink.classList.remove('active-link');
      // this.activeLink = null;
    }
   const target=this.activeLink = event.target as HTMLElement;
    target.classList.add('active-link');
    this.activeLink = target;
    
  }

}
