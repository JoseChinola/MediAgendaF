import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../../shared/models/patient.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }

  getMyPatient(userId: string) {
    return this.http.get<Patient>(`${environment.apiUrl}/Patient/${userId}`);
  }

  updatePatient(userId: string, data: any) {
    return this.http.put(`${environment.apiUrl}/Patient/${userId}`, data);
  }
}