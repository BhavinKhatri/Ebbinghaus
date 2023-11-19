import { Injectable, inject, signal, effect } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ServerLocalStorageService } from './server-local-storage.service';
import { BrowserLocalStorageService } from './browser-local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStore!: Storage;
  isBrowser = signal(false);
  storageType = 'server';
  expTime!: number;
  constructor(private browserLocalStorageService: BrowserLocalStorageService) {
    this.localStore = inject(ServerLocalStorageService);
    effect(() => {
      if (this.isBrowser()) {
        this.storageSwapToBrowser();
      }
    });
  }

  storageSwapToBrowser() {
    // replicate values from localstorage from server to the clien side
    const localTemp: KeyValue<string, string>[] = [];
    for (let i = 0; i < this.localStore.length; i++) {
      const k = this.localStore.key(i);
      if (k) {
        localTemp.push({
          key: k,
          value: this.localStore.getItem(k) ?? '',
        });
      }
    }
    // clear the server storage because values are in localTemp
    this.localStore.clear();
    // Swap the server store with that of browser
    this.localStore = this.browserLocalStorageService;
    this.storageType = 'browser';
    localTemp.forEach((t) => {
      this.localStore.setItem(t.key, t.value);
    });
  }
  clear(): void {
    this.localStore.clear();
  }
  getItem(key: string): string | null {
    return this.localStore.getItem(key);
  }
  key(index: number): string | null {
    return this.localStore.key(index);
  }
  removeItem(key: string): void {
    this.localStore.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.localStore.setItem(key, value);
  }

  setTokenExpTime() {
    const token = this.getItem('token');
    if (token) {
      const { exp } = jwtDecode(token);
      this.expTime = exp ?? 0;
    }
  }

  get isTokenExpired() {
    let isJwtExpired = false;
    const currentTime = new Date().getTime() / 1000;

    if (this.expTime) {
      if (currentTime > this.expTime) isJwtExpired = true;
    }
    return isJwtExpired;
  }
}
