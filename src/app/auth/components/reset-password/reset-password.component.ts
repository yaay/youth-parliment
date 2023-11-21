import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { ResetPasswordRepository } from 'src/app/domain/reset-password/reset-password.repository';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  constructor(
    private resetPasswordService: ResetPasswordRepository,
    private router: Router,
    private alerts: TuiAlertService
  ) {}

  email!: string;

  resetPasswordError() {
    this.alerts
      .open('يرجي التحقق من صحة البريد الإلكتروني', {
        status: 'error',
        autoClose: 5000,
      })
      .subscribe();
  }

  resetPassword() {
    this.resetPasswordService.resetPassword(this.email).subscribe({
      error: () => {
        this.resetPasswordError()
      },
      next: () => {
        this.router.navigate(['/login'], {
          queryParams: { passwordReset: 'true' },
        });
      },
    });
  }
}
