import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header',
    template: `
    <div *ngIf="isLoggedIn()">
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class HeaderComponent {

    constructor(private authService: AuthService) { }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    logout(): void {
        this.authService.logout();
    }
}
