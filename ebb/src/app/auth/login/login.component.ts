import { Component, NgZone, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  imports: [SharedModule, HttpClientModule, MatDividerModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  readonly clientId!: string;
  readonly loginURI!: string;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.loginService.isUserLoggedIn
      .pipe(takeUntilDestroyed())
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.ngZone.run(() => {
            this.addTokenAndRedirect();
          });
        }
      });
  }

  ngOnInit() {
    this.loginService.signInWithGoogle();
  }

  private addTokenAndRedirect() {
    this.router.navigate(['welcome']);
  }
}
