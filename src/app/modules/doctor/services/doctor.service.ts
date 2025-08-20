import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../../../shared/models/doctor.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  constructor(private http: HttpClient) { }

  getMyDoctor(userId: string) {
    return this.http.get<Doctor>(`${environment.apiUrl}/Doctor/${userId}`);
  }

  updateDoctor(userId: string, data: any) {
    return this.http.put(`${environment.apiUrl}/Doctor/${userId}`, data);
  }
}
