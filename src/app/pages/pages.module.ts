import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { FormStepperModule } from './form-stepper/form-stepper.module';


const pagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', component: ApplicationStatusComponent},
      {path: 'voter-data', loadChildren: () => FormStepperModule }
    ]
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ApplicationStatusComponent,
  ],
  imports: [
    CommonModule,
    TaigaUIModule,
    // FormStepperModule,
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [RouterModule]
})
export class PagesModule { }
