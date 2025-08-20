import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  imports: [],
  templateUrl: './doctor-dashboard.html'
})
export class DoctorDashboard {

  constructor(
    private router: Router
  ) { }


  seeMoreAppointments() {
    this.router.navigate(['/app/doctor/appointments']);
  }
}
