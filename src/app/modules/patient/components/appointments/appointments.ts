import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { Appointments } from '../../../../shared/models/appointment.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RescheduleAppointment } from "../reschedule-appointment/reschedule-appointment";
import { CancelAppointmentModal } from "../cancel-appointment-modal/cancel-appointment-modal";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.html',
  imports: [CommonModule, FormsModule, RescheduleAppointment, CancelAppointmentModal]
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointments[] = [];
  paginatedAppointments: Appointments[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;
  userId: string = '';
  searchTerm: string = '';
  showRescheduleModal = false;
  showCancelModal = false;
  selectedAppointment!: Appointments;

  constructor(
    private appointmentsService: AppointmentsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId() || '';
    if (!this.userId) {
      console.error('No user ID found');
      return;
    }
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

  openRescheduleModal(appointment: Appointments) {
    this.selectedAppointment = appointment;
    this.showRescheduleModal = true;
  }

  openCancelModal(appointment: Appointments) {
    this.selectedAppointment = appointment;
    this.showCancelModal = true;
  }


  onConfirmCancel() {
    if (!this.selectedAppointment?.id) return;

    this.appointmentsService.cancelAppointment(this.selectedAppointment.id).subscribe({
      next: (res: any) => {
        console.log('Appointment cancelled', res);
        this.loadAppointments();
        this.showCancelModal = false;
      },
      error: (err) => console.error('Error cancelling appointment:', err)
    });
  }

  onRescheduleSave(event: { appointmentId: string; newDate: string }) {
    const newDateObj = new Date(event.newDate);
    this.appointmentsService.rescheduleAppointment(event.appointmentId, newDateObj).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.message, 'Éxito');
        this.loadAppointments();
        this.showRescheduleModal = false;
      },
      error: (err) => {
        console.error('Error rescheduling appointment:', err);
        this.toastr.error(err.error.message, 'Error');
      }
    });
  }

  setPage(page: number) {
    const filtered = this.appointments.filter(appt =>
      (appt.doctor ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (appt.status ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (appt.notes ?? '').toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.pageSize) || 1;

    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAppointments = filtered.slice(start, end);
  }

  onSearchChange() {
    this.setPage(1);
  }

  getNow(): Date {
    return new Date();
  }
}
