import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientDashboard } from './components/patient-dashboard/patient-dashboard';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PatientRoutingModule,
        PatientDashboard
    ]
})

export class PatientModule { }