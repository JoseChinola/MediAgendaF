import { Component, OnInit } from '@angular/core';
import { Appointments } from '../../core/models/appointment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, // si usas standalone
  imports: [CommonModule],
  templateUrl: './Reception.html',
  styleUrls: ['./Reception.css'] // 👈 aquí es styleUrls en plural
})
export class Reception implements OnInit {
  appointments: Appointments[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  paginatedAppointments: Appointments[] = [];

  ngOnInit(): void {
    // Datos simulados
    this.appointments = [
      { fecha: new Date(), hora: '10:00 AM', paciente: 'Juan Pérez', doctor: 'Dr. Ramírez', estado: 'Confirmada' },
      { fecha: new Date(), hora: '11:30 AM', paciente: 'Ana López', doctor: 'Dra. Gómez', estado: 'Pendiente' },
      { fecha: new Date(), hora: '1:00 PM', paciente: 'Carlos Ruiz', doctor: 'Dr. Martínez', estado: 'Cancelada' },
      { fecha: new Date(), hora: '2:00 PM', paciente: 'María Torres', doctor: 'Dra. Silva', estado: 'Confirmada' },
      { fecha: new Date(), hora: '3:15 PM', paciente: 'Pedro Sánchez', doctor: 'Dr. Herrera', estado: 'Pendiente' },
      { fecha: new Date(), hora: '4:45 PM', paciente: 'Lucía Fernández', doctor: 'Dr. Romero', estado: 'Cancelada' },
    ];

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.appointments.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAppointments = this.appointments.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}