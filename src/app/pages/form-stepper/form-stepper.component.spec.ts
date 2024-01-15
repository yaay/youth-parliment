import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepperComponent } from './form-stepper.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FormStepperComponent', () => {
  let component: FormStepperComponent;
  let fixture: ComponentFixture<FormStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormStepperComponent],
      imports: [HttpClientTestingModule, TaigaUIModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(FormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
