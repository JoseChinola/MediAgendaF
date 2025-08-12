import { Routes } from '@angular/router';
import { Patient } from './components/patient/patient';
import { Doctor } from './components/doctor/doctor';
import { Layout } from './layout/layout/layout';
import { Reception } from './components/Reception/Reception';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {
        path: "",
        component: Layout,
        children: [
            {
                path: "",
                component: Reception,
                data: { breadcrumb: 'Reception' }                

            },
            {
                path: "dashboard",
                component: Dashboard,
                data: { breadcrumb: 'Dashboard' }
            },
            {
                path: "patient",
                component: Patient,
                data: { breadcrumb: 'Patient' }                
            },
            {
                path: "doctor",
                component: Doctor,
                data: { breadcrumb: 'Doctor' }
            },
            {
                path: "security",
                component: Doctor,
                data: { breadcrumb: 'Security' },
                children: [

                ]
            }
        ]
    }
];
