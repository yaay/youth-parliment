import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusRepository } from 'src/app/domain/request-status/request-status.repository';
import { RequestRepository } from 'src/app/domain/request-status/request.repository';
import { SignupRepository } from 'src/app/domain/signup/signup.repository';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent {

  constructor(private router: Router,private requestRepository:RequestStatusRepository,
    private userRepository:RequestRepository) {}

  startApplication() {
    this.userRepository.add({}).subscribe(_=>
      {
      this.router.navigate(['/voter-data'])
    });
  }

}
