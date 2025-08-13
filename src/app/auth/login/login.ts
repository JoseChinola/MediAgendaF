import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe({
        next: (res: any) => {
          this.loginForm.reset();


          //redireccion segun rol
          switch (res.role) {
            case 'Admin':
              this.router.navigate(['/dashboard']);
              break;
            case 'Doctor':
              this.router.navigate(['/doctor']);
              break;
            case 'Patient':
              this.router.navigate(['/patient']);
              break;
            case 'Reception':
              this.router.navigate(['/reception']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        },
        error: (err) => {
          console.log(err);
        },
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
