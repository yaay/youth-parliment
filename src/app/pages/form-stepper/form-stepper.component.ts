import { Component } from '@angular/core';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css']
})
export class FormStepperComponent {
  constructor(private stepperStateService: StepperStateService) { }

  getMainDataState() {
    return this.stepperStateService.mainDataState();
  }
  getContactState() {
    return this.stepperStateService.contactState();
  }
  getEduQualsState() {
    return this.stepperStateService.eduQualState();
  }
  getAttachmentsState() {
    return this.stepperStateService.attachmentsState();
  }

  stepsState: {name: string, state: string}[] = [
    {
      name: 'main',
      state: 'pass'
    },
    {
      name: 'contact',
      state: ''
    },
    {
      name: 'ed-quals',
      state: ''
    },
    {
      name: 'attachments',
      state: ''
    },
  ]



}
