import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  isVisible=new BehaviorSubject<boolean>(false)

  projectNameSubject = new Subject<string>()

 
}
