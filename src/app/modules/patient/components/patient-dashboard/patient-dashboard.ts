import { Component } from '@angular/core';
import { Patient } from '../../../../shared/models/patient.model';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { AppointmentsComponent } from "../appointments/appointments";
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, AppointmentsComponent],
  templateUrl: './patient-dashboard.html'
})
export class PatientDashboard {
  patient: Patient | null = null;


  constructor(private patientService: PatientService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error('No user ID found');
      return;
    }


    this.patientService.getMyPatient(userId).subscribe({
      next: (data) => {
        this.patient = data;
      },
      error: (err) => console.error('Error fetching patient data:', err)
    });
  }


  newAppointment() { this.router.navigate(['/app/patient/create']); }
}
