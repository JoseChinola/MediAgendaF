import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { PatientDashboard } from './components/patient-dashboard/patient-dashboard';
import { AppointmentsComponent } from './components/appointments/appointments';
import { profile } from './components/setting/profile/profile';
import { Setting } from './components/setting/setting';
import { ChangePassword } from './components/setting/security/changePassword';
import { CreateAppointment } from './components/create-appointment/create-appointment';

const routes: Routes = [
    {
        path: "",
        component: PatientDashboard,
        canActivate: [authGuard],
        data: { breadcrumb: 'Dashboard' }
    },
    {
        path: "appointments",
        component: AppointmentsComponent,
        canActivate: [authGuard],
        data: { breadcrumb: 'Citas' }
    },
    {
        path: "create",
        component: CreateAppointment,
        canActivate: [authGuard],
        data: { breadcrumb: 'Crear Cita' }
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

export class PatientRoutingModule { }
