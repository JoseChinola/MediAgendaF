import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointments } from '../../../shared/models/appointment.model';

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