import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProPopupComponent } from '../create-project/create-pro-popup/create-pro-popup.component';
import { DataServiceService } from '../../../service/data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog:MatDialog,private serv:DataServiceService){}
  openDialog(): void {
this.serv.isVisible.next(true)
    const dialogRef = this.dialog.open(CreateProPopupComponent, {
      width: '1100px',
      height: '650px',
      maxWidth:'none',
      panelClass: 'custom-dialog-container',
      data: { name: '', email: '' }
    });
    this.serv.isVisible.next(true)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Form data:', result);
    });
  }
  
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
