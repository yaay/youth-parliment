import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request.service';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { RequestStatusRepository } from 'src/app/domain/request-status/request-status.repository';

type stateResult = 'pass' | 'error' | 'normal';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css']
})
export class FormStepperComponent {
  constructor(private stepperStateService: StepperStateService,
              private router: Router,
              private requestStatusRepository:RequestStatusRepository,
              private requestService: RequestService
              ) { }

  ngOnInit() {
    this.setRequestIdSignal();
  }

  private getStateFromService(getStateFn: () => string): stateResult {
    const result = getStateFn();
    return result === 'pass' ? 'pass' : result === 'error' ? 'error' : 'normal';
  }

  setRequestIdSignal() {
    this.requestStatusRepository.get().subscribe((response) => {
      const requestId = response.id;
      this.requestService.requestId.set(requestId);
    })
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
