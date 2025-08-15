import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(id: string) {
    return this.http.get(`${environment.apiUrl}/User/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}/User/${id}`, data);
  }

  updateUserPassword(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}/User/change-password/${id}`, data);
  }
}
