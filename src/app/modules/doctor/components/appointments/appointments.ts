import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Appointment {
  id: string;
  patientName: string;
  date: Date;
  type: string;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-appointments',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointments.html',
  styles: ``
})
export class Appointments {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];

  searchTerm: string = '';
  selectedStatus: 'all' | 'completed' | 'pending' = 'all';

  ngOnInit() {
    // Datos simulados
    this.appointments = [
      { id: '1', patientName: 'Juan Pérez', date: new Date(), type: 'Consulta general', status: 'completed' },
      { id: '2', patientName: 'María López', date: new Date(), type: 'Control', status: 'pending' },
      { id: '3', patientName: 'Carlos García', date: new Date(), type: 'Chequeo', status: 'pending' }
    ];

    this.applyFilters();
  }

  applyFilters() {
    this.filteredAppointments = this.appointments.filter(a => {
      const statusMatch = this.selectedStatus === 'all' || a.status === this.selectedStatus;
      const searchMatch = a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }

  markCompleted(appointment: Appointment) {
    appointment.status = 'completed';
    this.applyFilters();
  }

}
