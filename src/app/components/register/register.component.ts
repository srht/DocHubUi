import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { GlobalModules } from '../../globalModules';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [GlobalModules],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(private userService: UsersService) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  register() {
    var registerModel = this.registerForm.value
    this.userService.Register(registerModel)
  }
}
