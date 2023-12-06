import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutRepository } from 'src/app/domain/logout/logout.repository';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(
    private logoutRepository: LogoutRepository,
    private router: Router
    ) {}

  open = false;
 
  toggle(open: boolean) {
    this.open = open;
  };

  logout() {
    this.logoutRepository.add('').subscribe();
    this.router.navigate(['/login'])
  };

}
