import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { NEVER } from 'rxjs';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const localStorage = inject(LocalStorageService);
  const token = localStorage.getItem('token') ?? '';
  if (localStorage.isTokenExpired) {
    localStorage.clear();
    return NEVER;
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clonedRequest);
}
