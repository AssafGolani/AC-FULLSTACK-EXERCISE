import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToolbarComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  loginForm: FormGroup;
  attemptsCounter = 0;
  lockoutTime = 0;
  lockoutMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.attemptsCounter++;
      if (this.attemptsCounter >= 3) {
        this.lockoutTime = Date.now() + 60000; // lockout for 1 minute
        this.updateLockoutMessage();
        alert('Too many failed attempts. Please try again later.');
      } else {
        alert('Invalid credentials');
      }
    }
  }

  get isLockedOut(): boolean {
    return this.lockoutTime > Date.now();
  }

  get lockoutRemaining(): number {
    return Math.max(0, Math.ceil((this.lockoutTime - Date.now()) / 1000));
  }

  updateLockoutMessage(): void {
    const remainingTime = this.lockoutTime - Date.now();
    if (remainingTime > 0) {
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      this.lockoutMessage = `Locked out. Try again in ${minutes}m ${seconds}s.`;
    } else {
      this.lockoutMessage = '';
    }
  }
}
