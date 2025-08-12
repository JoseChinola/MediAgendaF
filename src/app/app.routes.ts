import { Routes } from '@angular/router';
import { Patient } from './components/patient/patient';
import { Doctor } from './components/doctor/doctor';
import { Layout } from './layout/layout/layout';
import { Reception } from './components/Reception/Reception';
import { Dashboard } from './components/dashboard/dashboard';
import { Security } from './components/security/security';
import { Permission } from './components/security/permission/permission';
import { Roles } from './components/security/roles/roles';
import { Users } from './components/security/users/users';

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
                component: Security,
                data: { breadcrumb: 'Security' },
                children: [
                    {
                        path: "permisos",
                        component: Permission,
                        data: { breadcrumb: 'Permisos' }
                    },
                    {
                        path: "roles",
                        component: Roles,
                        data: { breadcrumb: 'Roles' }
                    },
                    {
                        path: "users",
                        component: Users,
                        data: { breadcrumb: 'Usuarios' }
                    },
                ]
            }
        ]
    }
];
