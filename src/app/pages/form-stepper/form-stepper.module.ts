import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStepperComponent } from './form-stepper.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { RouterModule, Routes } from '@angular/router';
import { MainDataComponent } from './pages/main-data/main-data.component';
import { ContactDataComponent } from './pages/contact-data/contact-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationalQualificationsComponent } from './pages/educational-qualifications/educational-qualifications.component';
import { AttachmentsComponent } from './pages/attachments/attachments.component';
import { NumbersOnlyDirective } from 'src/app/shared/directives/numbers-only.directive';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';


const stepperRoutes: Routes = [
  {
    path: '',
    component: FormStepperComponent,
    children: [
      {path: '', redirectTo: 'main-data', pathMatch: 'full'},
      {path: 'main-data', component: MainDataComponent},
      {path: 'contact-data', component: ContactDataComponent},
      {path: 'edu-qualifications', component: EducationalQualificationsComponent},
      {path: 'attachments', component: AttachmentsComponent},
      {path: 'confirmation', component: ConfirmationComponent},

    ]
  }
]



@NgModule({
  declarations: [
    FormStepperComponent,
    ContactDataComponent,
    MainDataComponent,
    EducationalQualificationsComponent,
    NumbersOnlyDirective,
    AttachmentsComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    TaigaUIModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(stepperRoutes)
  ],
  exports: [RouterModule]
})
export class FormStepperModule { }
