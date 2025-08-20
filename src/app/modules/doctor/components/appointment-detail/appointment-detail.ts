import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface AppointmentDetails {
  patientName: string;
  email: string;
  phone: string;
  date: Date;
  type: string;
  status: 'completed' | 'pending';
  notes?: string;
}

@Component({
  selector: 'app-appointment-detail',
  imports: [CommonModule],
  templateUrl: './appointment-detail.html',
  styles: ``
})
export class AppointmentDetail {
  appointment: AppointmentDetails = {
    patientName: '',
    email: '',
    phone: '',
    date: new Date(),
    type: '',
    status: 'pending',
    notes: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Aquí normalmente llamarías a un servicio para obtener los datos por ID
    // Simulación de datos
    this.appointment = {
      patientName: 'Juan Pérez',
      email: 'juan@mail.com',
      phone: '555-1234',
      date: new Date(),
      type: 'Consulta general',
      status: 'pending',
      notes: 'Paciente con seguimiento de presión arterial'
    };
  }

  markCompleted() {
    this.appointment.status = 'completed';
    // Aquí normalmente actualizarías en el backend
  }

  goBack() {
    this.router.navigate(['/app/doctor/appointments']);
  }
}
