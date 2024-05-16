import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-membertool',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="isLoggedIn()">
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!isLoggedIn()">
      <button routerLink="/login">Login</button>
    </div>
  `
})
export class MembertoolComponent {

  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
