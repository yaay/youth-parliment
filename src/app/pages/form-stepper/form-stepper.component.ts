import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';

type stateResult = 'pass' | 'error' | 'normal';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css']
})
export class FormStepperComponent {
  constructor(private stepperStateService: StepperStateService,
              private router: Router) { }

  private getStateFromService(getStateFn: () => string): stateResult {
    const result = getStateFn();
    return result === 'pass' ? 'pass' : result === 'error' ? 'error' : 'normal';
  }

  getMainDataState(): stateResult {
    return this.getStateFromService(() => this.stepperStateService.mainDataState());
  }

  getContactState(): stateResult {
    return this.getStateFromService(() => this.stepperStateService.contactState());
  }

  getEduQualsState(): stateResult {
    return this.getStateFromService(() => this.stepperStateService.eduQualState());
  }

  getAttachmentsState(): stateResult {
    return this.getStateFromService(() => this.stepperStateService.attachmentsState());
  }

  navigator(pageName: string) {
    this.router.navigate([`/voter-data/${pageName}`], { skipLocationChange: true })
  }

}
