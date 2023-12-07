import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TaigaUIModule } from 'src/app/shared/Taiga UI/taiga-ui.module';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { FormStepperModule } from './form-stepper/form-stepper.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '../auth/guards/auth.guard';


const pagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', component: ApplicationStatusComponent},
      {path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
      {path: 'voter-data', loadChildren: () => FormStepperModule, canActivate: [authGuard] }
    ]
  }
]


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ApplicationStatusComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    TaigaUIModule,
    ReactiveFormsModule,
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [RouterModule]
})
export class PagesModule { }
