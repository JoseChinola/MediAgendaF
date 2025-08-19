import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { PatientService } from '../../../services/patient.service';
import { UserService } from '../../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private patientService: PatientService,
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
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phoneNumber: [{ value: '', disabled: true }],
      birthDate: [{ value: '', disabled: true }, Validators.required],
      address: [{ value: '', disabled: true }]
    });
    this.loadProfile();
  }


  loadProfile() {
    this.loading = true;
    this.patientService.getMyPatient(this.userId).subscribe({
      next: (patient) => {
        this.profileForm.patchValue({
          firstName: patient.user.firstName,
          lastName: patient.user.lastName,
          email: patient.user.email,
          phoneNumber: patient.user.phoneNumber,
          birthDate: patient.birthDate ? patient.birthDate.substring(0, 10) : '',
          address: patient.address
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

    const patientPayload = {
      birthDate: this.profileForm.value.birthDate,
      address: this.profileForm.value.address
    };

    // Actualizar datos del usuario
    this.userService.updateUser(this.userId, userPayload).subscribe({
      next: () => {
        this.patientService.updatePatient(this.userId, patientPayload).subscribe({
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
