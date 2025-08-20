import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Patient {
  name: string;
  email: string;
  phone: string;
  appointmentDate: Date;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-patients',
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.html',
  styles: ``
})
export class Patients {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];

  searchTerm: string = '';
  selectedStatus: 'all' | 'completed' | 'pending' = 'all';

  ngOnInit() {
    this.patients = [
      { name: 'Juan Pérez', email: 'juan@mail.com', phone: '555-1234', appointmentDate: new Date(), status: 'completed' },
      { name: 'María López', email: 'maria@mail.com', phone: '555-5678', appointmentDate: new Date(), status: 'pending' },
      { name: 'Carlos García', email: 'carlos@mail.com', phone: '555-9012', appointmentDate: new Date(), status: 'completed' }
    ];

    // Filtramos
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPatients = this.patients.filter(p => {
      // Filtrar por estado
      const statusMatch = this.selectedStatus === 'all' || p.status === this.selectedStatus;

      // Filtrar por búsqueda
      const searchMatch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || p.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }
}
