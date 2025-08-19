import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html'
})
export class Login {
  loginForm!: FormGroup;
  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.toastr.success('Bienvenido', 'Éxito');
          this.router.navigate(['/']);
          this.loginForm.reset();
        },
        error: (err) => {
          this.toastr.error(err.error, 'Error');
          console.log(err);
        },
      }).add(() => {
        this.isLoading = false;
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}


