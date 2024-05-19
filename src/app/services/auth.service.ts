import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logout(): void {
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');

    if (!token) return false;
    if (this.isTokenExpired(token)) {
      return false;
    }

    return !!token;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

    return expiry + 100 > Date.now();
  }
}
