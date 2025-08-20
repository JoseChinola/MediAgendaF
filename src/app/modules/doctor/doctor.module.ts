import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { DoctorRoutingModule } from './doctor-routing.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        DoctorRoutingModule,
        DoctorDashboard,
    ]
})

export class DoctorModule { }