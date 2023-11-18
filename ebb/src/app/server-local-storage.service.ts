import { KeyValue } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerLocalStorageService implements Storage {
  get length(): number {
    return this.localStore.length;
  }
  private localStore!: KeyValue<string, string>[];
  constructor(@Optional() @Inject('REQUEST') private request: any) {
    this.localStore = [];
    console.log('request user');
    if (this.request) {
      const { token } = this.request.session.user;
      this.localStore.push({
        key: 'token',
        value: token,
      });
    }
  }
  clear(): void {
    this.localStore.length = 0;
  }
  getItem(key: string): string | null {
    return this.localStore.find((x) => x.key === key)?.value ?? null;
  }
  key(index: number): string | null {
    return this.localStore[index].key;
  }
  removeItem(key: string): void {
    const indexOfItem = this.localStore.findIndex((x) => x.key === key);
    this.localStore.splice(indexOfItem, 1);
  }
  setItem(key: string, value: string): void {
    this.localStore.push({
      key,
      value,
    });
  }
}
