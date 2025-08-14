import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointments } from '../../../../shared/models/appointment.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.html',
  imports: [CommonModule],
  styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointments[] = [];
  paginatedAppointments: Appointments[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  userId: string = '';

  constructor(private appointmentsService: AppointmentsService, private authService: AuthService) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    this.userId = userId;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getPatientAppointments(this.userId).subscribe({
      next: (data: Appointments[]) => {
        this.appointments = data;
        this.totalPages = Math.ceil(this.appointments.length / this.pageSize);
        this.setPage(this.currentPage);
      },
      error: (err) => console.error('Error fetching appointments:', err)
    });
  }  

  cancelAppointment(appointment: Appointments) {
    if (!appointment.id) {
      console.error('Appointment ID is undefined');
      return;
    }
    this.appointmentsService.cancelAppointment(appointment.id).subscribe({
      next: () => {
        console.log('Appointment cancelled', appointment.id);
        this.loadAppointments();
      },
      error: (err) => console.error('Error cancelling appointment:', err)
    });
  }

  rescheduleAppointment(appointment: Appointments, newDate: Date) {
    if (!appointment.id) {
      console.error('Appointment ID is undefined');
      return;
    }

    this.appointmentsService.rescheduleAppointment(appointment.id, newDate).subscribe({
      next: () => {
        console.log('Appointment rescheduled', appointment.id);
        this.loadAppointments(); // refrescar lista
      },
      error: (err) => console.error('Error rescheduling appointment:', err)
    });
  }

  setPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAppointments = this.appointments.slice(start, end);
  }

  getNow(): Date {
    return new Date();
  }
}
