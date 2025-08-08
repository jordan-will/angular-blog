import { Injectable } from '@angular/core';
import { PATH } from 'helpers/path';

@Injectable({
  providedIn: 'root'
})
export class LocalStorage {

  save(key: PATH, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: PATH): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: PATH): void {
    localStorage.removeItem(key);
  }
}
