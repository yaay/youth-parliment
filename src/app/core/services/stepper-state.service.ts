import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperStateService {

  constructor() { }
 
  mainDataState = signal('normal');
  contactState = signal('normal');
  eduQualState = signal('normal');
  attachmentsState = signal('normal');


}