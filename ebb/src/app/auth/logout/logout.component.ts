import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private loginService: LoginService
  ) {}
  onLogout() {
    this.localStorage.clear();
    this.loginService.isUserLoggedIn.next(false);
    this.router.navigate(['welcome']);
  }
}
