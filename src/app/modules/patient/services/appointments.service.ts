import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from '../../../shared/models/appointment.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = '/appointment/patient';

  constructor(private http: HttpClient) { }

  getPatientAppointments(patientId: string): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(`${environment.apiUrl}${this.baseUrl}/${patientId}`);
  }

  // Cancelar una cita por su id
  cancelAppointment(appointmentId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/appointment/${appointmentId}`);
  }

  // Reprogramar una cita (actualiza la fecha)
  rescheduleAppointment(appointmentId: string, newDate: Date): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/appointment/${appointmentId}`, { newDate });
  }
}
