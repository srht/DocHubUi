import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalModules } from '../../globalModules';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GlobalModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private userService: UsersService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  login() {
    var loginModel = this.loginForm.value
    this.userService.Login(loginModel)
  }
}
