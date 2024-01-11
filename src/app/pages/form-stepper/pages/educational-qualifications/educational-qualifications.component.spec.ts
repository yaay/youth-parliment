import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module'

import { EducationalQualificationsComponent } from './educational-qualifications.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('EducationalQualificationsComponent', () => {
  let component: EducationalQualificationsComponent;
  let fixture: ComponentFixture<EducationalQualificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalQualificationsComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, TaigaUIModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(EducationalQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
