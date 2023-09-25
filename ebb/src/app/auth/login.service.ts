
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  userSubject: BehaviorSubject<SocialUser> = new BehaviorSubject(new SocialUser());
  currentUser$ = this.userSubject.asObservable();

  getUserValidation(token: string) {
    return this.httpClient.get(`${Environment.APP_URL}/auth/user`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    });
  }
}
