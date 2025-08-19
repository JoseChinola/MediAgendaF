import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../../../shared/models/appointment.model';
import { environment } from '../../../../environments/environment';
import { Doctor } from '../../../shared/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = '/appointment';

  constructor(private http: HttpClient) { }

  getPatientAppointments(patientId: string): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(`${environment.apiUrl}${this.baseUrl}/patient/${patientId}`);
  }

  createAppointment(appointment: Appointments): Observable<Appointments> {
    return this.http.post<Appointments>(`${environment.apiUrl}${this.baseUrl}`, appointment);
  }

  // Cancelar una cita por su id
  cancelAppointment(appointmentId: string): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${this.baseUrl}/status`, {
      appointmentId,
      status: "Cancelada"
    });
  }

  rescheduleAppointment(appointmentId: string, newDate: Date): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}${this.baseUrl}/reschedule`, {
      id: appointmentId,
      newAppointmentDate: newDate
    });
  }

  getAvailableHours(doctorId: string, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}${this.baseUrl}/available-hours/${doctorId}`, {
      params: { date }
    });
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${environment.apiUrl}/doctor`);
  }
}
