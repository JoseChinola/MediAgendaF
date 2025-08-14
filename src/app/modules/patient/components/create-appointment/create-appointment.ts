import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';
import { Router } from '@angular/router';
import { Appointments } from '../../../../shared/models/appointment.model';

@Component({
  selector: 'app-create-appointment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css'
})
export class CreateAppointment {
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctor: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      notes: ['']
    });
  }

  Onsubmit() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const formValue = this.appointmentForm.value;

    // Combinar fecha y hora en un Date
    const date = new Date(formValue.appointmentDate);
    const [hours, minutes] = formValue.appointmentTime.split(':').map((v: string) => parseInt(v));
    date.setHours(hours, minutes);

    // Convertir a string ISO
    const appointmentDateString = date.toISOString();

    const newAppointment: Appointments = {
      doctor: formValue.doctor,
      appointmentDate: appointmentDateString,
      notes: formValue.notes || null,
      status: 'Pendiente'
    };

    this.appointmentsService.createAppointment(newAppointment).subscribe({
      next: () => {
        alert('Cita creada correctamente');
        this.router.navigate(['/app/patient']);
      },
      error: (err) => console.error('Error creando cita:', err)
    });
  }
}
