import { TestBed } from '@angular/core/testing';

import { StepperStateService } from './stepper-state.service';

describe('StepperStateService', () => {
  let service: StepperStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
