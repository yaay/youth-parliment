import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TaigaUIModule } from "./shared/Taiga UI/taiga-ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { LoginInterceptor } from "./core/services/login.interceptor";
import { PagesModule } from "./pages/pages.module";
import { DropdownMenuComponent } from './shared/components/dropdown-menu/dropdown-menu.component';
import { CookieService } from "ngx-cookie-service";
import { BirthDateFromNationalIdPipe } from './shared/pipes/birth-date-from-national-id.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    DropdownMenuComponent,
    BirthDateFromNationalIdPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PagesModule,
    TaigaUIModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true,
    },[CookieService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
