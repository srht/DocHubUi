import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-membertool',
  standalone: true,
  imports: [CommonModule, RouterModule,MatIconModule, MatButtonModule, MatIconModule, MatButtonModule, MatIconModule, MembertoolComponent],
  template: `
    <button *ngIf="isLoggedIn()" (click)="logout()" mat-icon-button>
    <mat-icon>logout</mat-icon>
  </button>
    <button *ngIf="!isLoggedIn()" routerLink="/login" routerLinkActive="true" mat-icon-button>
    <mat-icon>login</mat-icon>
  </button>
  <button *ngIf="!isLoggedIn()" routerLink="/register" routerLinkActive="true"  mat-icon-button>
    <mat-icon>how_to_reg</mat-icon>
  </button>
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
