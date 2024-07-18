import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private readonly TOKEN_KEY = 'loginToken';

  constructor() {}

  login(userName: string, password: string): boolean {
    if (userName === 'myUser' && password === 'myPass') {
      localStorage.setItem(this.TOKEN_KEY, 'valid-token');
      this._isLoggedIn$.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._isLoggedIn$.next(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
