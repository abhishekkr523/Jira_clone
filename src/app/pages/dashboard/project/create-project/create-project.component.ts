import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {


  projectName: FormControl = new FormControl('', [
    Validators.required,
    
    Validators.pattern('^[a-zA-Z0-9]+$')
  ]); ;

  interInput: any;
  ngOnInit() {
   
     this.projectName.valueChanges.subscribe((data: any) => {
      console.log(data);
      this.interInput = data;
      console.log('tarun',this.interInput)
    })
  }

}
