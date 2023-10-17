import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.localStorageService.setItem('token', user.idToken);
      }
      this.userSubject.next(user);
      this.isUserLoggedIn.next(!!user);
    });
  }
  userSubject: BehaviorSubject<SocialUser> = new BehaviorSubject(
    new SocialUser()
  );
  currentUser$ = this.userSubject.asObservable();
  isUserLoggedIn: Subject<boolean> = new Subject();
  onLogginChange$ = this.isUserLoggedIn.asObservable();
  getUserValidation(token: string) {
    this.localStorageService.setItem('token', token);
    return this.httpClient.get(`${Environment.APP_URL}/auth/user`);
  }
}
