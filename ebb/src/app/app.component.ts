import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './auth/login.service';

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
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.localStorageService.isBrowser.set(
      isPlatformBrowser(inject(PLATFORM_ID))
    );
  }
  ngOnInit(): void {
    this.loginService.onLogginChange$.subscribe((isLoggedIn) => {
      this.isUserSignedIn = isLoggedIn;
    });
  }

  onLogOut() {
    this.router.navigate(['auth/logout']);
  }
}
