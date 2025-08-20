import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { Appointments } from './components/appointments/appointments';
import { Patients } from './components/patients/patients';
import { AppointmentDetail } from './components/appointment-detail/appointment-detail';
import { Setting } from './components/setting/setting';
import { profile } from './components/setting/profile/profile';
import { ChangePassword } from './components/setting/security/changePassword';


const routes: Routes = [
    {
        path: "",
        component: DoctorDashboard,
        canActivate: [authGuard],
        data: { breadcrumb: 'Dashboard' }
    },
    {
        path: "appointments",
        component: Appointments,
        canActivate: [authGuard],
        data: { breadcrumb: 'Citas' }
    },
    {
        path: "appointments/:id",
        component: AppointmentDetail,
        canActivate: [authGuard],
        data: { breadcrumb: 'Detalle de Cita' }
    },
    {
        path: "patients",
        component: Patients,
        canActivate: [authGuard],
        data: { breadcrumb: 'Pacientes' }
    },
    {
        path: "setting",
        component: Setting,
        data: { breadcrumb: 'Configuración' },
        children: [
            {
                path: "profile",
                component: profile,
                canActivate: [authGuard],
                data: { breadcrumb: 'Perfil' }
            },
            {
                path: "security",
                component: ChangePassword,
                canActivate: [authGuard],
                data: { breadcrumb: 'Security' }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DoctorRoutingModule { }
