import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../core/services/user.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-change-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './changePassword.html',

})
export class ChangePassword {
    userId: string = '';
    passwordForm!: FormGroup;
    submitted = false;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService,
    ) { }


    ngOnInit() {
        this.userId = this.authService.getUserId() || '';


        this.passwordForm = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('newPassword')!.value === form.get('confirmPassword')!.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        this.submitted = true;
        if (this.passwordForm.invalid) return;

        this.isLoading = true;
        this.userService.updateUserPassword(this.userId, this.passwordForm.value).subscribe({
            next: (res: any) => {
                console.log(res);
                this.toastr.success(res.message, 'Éxito');
                this.passwordForm.reset();
                this.submitted = false;
            },
            error: (err) => {
                console.log(err)
                this.toastr.error(err.message, 'Error');
            }
        }).add(() => {
            this.isLoading = false;
        });
    }
}
