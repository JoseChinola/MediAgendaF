import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { UserService } from '../../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class profile {
  userId: string = '';
  profileForm!: FormGroup;
  loading = false;
  editing = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private doctorService: DoctorService,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId() || '';
    if (!this.userId) {
      console.error('No user ID found');
      return;
    }

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: true }],
      specialty: [{ value: '', disabled: true }, Validators.required],
      bio: [{ value: '', disabled: true }]
    });

    this.loadProfile();
  }


  loadProfile() {
    this.loading = true;
    this.doctorService.getMyDoctor(this.userId).subscribe({
      next: (doctor) => {
        const fullName = doctor.fullName || '';
        const [first, ...rest] = fullName.split(' ');

        this.profileForm.patchValue({
          firstName: first || '',
          lastName: rest.join(' ') || '',
          email: doctor.email,
          phoneNumber: doctor.phoneNumber,
          specialty: doctor.specialty,
          bio: doctor.bio
        });

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  enableEdit() {
    this.editing = true;
    this.profileForm.enable();


  }

  cancelEdit() {
    this.editing = false;
    this.profileForm.disable();
    this.loadProfile();
  }

  updateUser() {
    if (this.profileForm.invalid) return;

    this.loading = true;

    const userPayload = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      phoneNumber: this.profileForm.value.phoneNumber
    };

    const doctorPayload = {
      specialty: this.profileForm.value.specialty,
      bio: this.profileForm.value.bio
    };

    this.userService.updateUser(this.userId, userPayload).subscribe({
      next: () => {
        this.doctorService.updateDoctor(this.userId, doctorPayload).subscribe({
          next: () => {
            this.toastr.success('Perfil actualizado correctamente', 'Éxito');
            this.editing = false;
            this.profileForm.disable();
            this.loading = false;
            this.loadProfile();
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Error al actualizar datos', 'Error');
            this.loading = false;
          }
        })
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al actualizar datos', 'Error');
        this.loading = false;
      }
    });
  }
}
