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
import { Profile } from './components/profile/profile';
import { Home } from './components/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: "",
        component: Layout,
        canActivate: [authGuard],
        data: { breadcrumb: 'Home' },
        children: [
            {
                path: "reception",
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
                path: "profile",
                component: Profile,
                data: { breadcrumb: 'Perfil' }
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
            },

        ]
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "register",
        component: Register
    },
    { path: "**", redirectTo: "" }
];
