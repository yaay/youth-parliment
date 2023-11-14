import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStepperComponent } from './form-stepper.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { RouterModule, Routes } from '@angular/router';
import { MainDataComponent } from './pages/main-data/main-data.component';
import { ContactDataComponent } from './pages/contact-data/contact-data.component';
import { ReactiveFormsModule } from '@angular/forms';


const stepperRoutes: Routes = [
  {
    path: '',
    component: FormStepperComponent,
    children: [
      {path: '', redirectTo: 'main-data', pathMatch: 'full'},
      {path: 'main-data', component: MainDataComponent},
      {path: 'contact-data', component: ContactDataComponent}

    ]
  }
]



@NgModule({
  declarations: [
    FormStepperComponent,
    ContactDataComponent
  ],
  imports: [
    CommonModule,
    TaigaUIModule,
    ReactiveFormsModule,
    RouterModule.forChild(stepperRoutes)
  ],
  exports: [RouterModule]
})
export class FormStepperModule { }
