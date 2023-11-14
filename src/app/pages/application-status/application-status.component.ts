import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent {

  constructor(private router: Router) {}

  startApplication() {
    this.router.navigate(['/voter-data'])
  }

}
