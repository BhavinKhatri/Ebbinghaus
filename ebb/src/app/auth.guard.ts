import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      // if localstorage is not of browser storage then swap it
      if (this.localStorage.storageType === 'server') {
        this.localStorage.storageSwapToBrowser();
      }
      const token = this.localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/auth']);
        return false;
      }
    }
    return true;
  }
}
