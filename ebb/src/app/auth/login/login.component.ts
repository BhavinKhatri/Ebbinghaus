import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginService } from '../login.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  standalone: true,
  imports: [SharedModule, HttpClientModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly clientId!: string;
  readonly loginURI!: string;
  constructor(
    private loginService: LoginService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    @Inject(DOCUMENT) private readonly doc: Document,
    private desstroyRef: DestroyRef,
    private localStorage: LocalStorageService
  ) {
    this.clientId = Environment.GOOGLE_CLIENT_ID;
    this.loginURI = Environment.GOOGLE_LOGIN_URI;
    (<any>this.doc?.defaultView).login = (user: any) => {
      this.loginService.userSubject.next(user);

      this.loginService
        .getUserValidation(user.credential)
        .pipe(takeUntilDestroyed(this.desstroyRef))
        .subscribe(() => {
          this.addTokenAndRedirect({ idToken: user.credential });
        });
    };

    this.socialAuthService.authState
      .pipe(takeUntilDestroyed(this.desstroyRef))
      .subscribe((user) => {
        if (user) {
          this.loginService
            .getUserValidation(user.idToken)
            .pipe(takeUntilDestroyed(this.desstroyRef))
            .subscribe(() => {
              this.loginService.userSubject.next(user);
              this.addTokenAndRedirect(user);
            });
        }
      });
  }

  private addTokenAndRedirect(user: { idToken: string }) {
    this.localStorage.setItem('token', user.idToken);
    this.router.navigate(['welcome']);
  }
}
