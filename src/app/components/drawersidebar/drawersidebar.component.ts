import { Component } from '@angular/core';
import { LoginModel } from '../../models/users/login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { GlobalModules } from '../../globalModules';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-drawersidebar',
  standalone: true,
  imports: [MatDrawer, MatIcon, MatToolbar, MatDrawerContainer, MatList, MatListItem, GlobalModules],
  templateUrl: './drawersidebar.component.html',
  styleUrl: './drawersidebar.component.css'
})
export class DrawersidebarComponent {
  title = 'yayinteklif';
  showFiller = false;
  currentUser!: LoginModel;
  isAdmin = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    this.isAdmin = true;
  }

  logout() {
    //this.router.navigate(['/uye-giris']);
    window.location.href = '/uye-giris'
  }
}
