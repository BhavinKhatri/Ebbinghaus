import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginService } from './auth/login.service';
import { LocalStorageService } from './local-storage.service';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'M2Memorize';
  isUserSignedIn!: boolean;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.loginService.isUserLoggedIn.subscribe((isLoggedIn) => {
      this.isUserSignedIn = isLoggedIn;
      this.localStorageService.setTokenExpTime();
    });
  }

  onLogOut() {
    this.router.navigate(['auth/logout']);
  }
}
