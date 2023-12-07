import { Injectable } from '@angular/core';
import { UserInfoRepository } from 'src/app/domain/user-info/user-infp.repository';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private userInfo: UserInfoRepository) { }

  async checkAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.userInfo.get().subscribe({
        next: (data) => {
          if (data.authorities[0].authority == 'ROLE_USER') {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: () => {
          resolve(false);
        }
      });
    });
  }

}
