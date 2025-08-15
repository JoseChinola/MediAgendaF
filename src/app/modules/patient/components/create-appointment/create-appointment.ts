import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';
import { Router } from '@angular/router';
import { Appointments } from '../../../../shared/models/appointment.model';
import { Doctor } from '../../../../shared/models/doctor.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css'
})
export class CreateAppointment {
  appointmentForm: FormGroup;
  doctors: Doctor[] = [];
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctor: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit() {
    this.userId = this.authService.getUserId() || '';
    if (!this.userId) {
      console.error('No user ID found');
      return;
    }
    this.loadDoctors();
  }

  Onsubmit() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.appointmentForm.value;

    if (!formValue.doctor) {
      alert('Por favor, seleccione un doctor.');
      return;
    }

    // Construir fecha y hora sin conversión de zona horaria
    const appointmentDateString = `${formValue.appointmentDate}T${formValue.appointmentTime}`;

    const newAppointment = {
      doctorId: formValue.doctor,
      patientId: this.userId,
      appointmentDate: appointmentDateString,
      notes: formValue.notes || ''
    };

    this.appointmentsService.createAppointment(newAppointment).subscribe({
      next: () => {
        this.toastr.success('Cita creada correctamente', 'Éxito');
        this.router.navigate(['/app/patient']);
      },
      error: (err) => {
        console.error('Error creando cita:', err);
        this.toastr.error('Error al crear cita', 'Error');
      }
    });
  }

  loadDoctors() {
    this.appointmentsService.getAllDoctors().subscribe({
      next: (data) => this.doctors = data,

      error: (err) => console.error('Error cargando doctores:', err)
    });
  }
}
