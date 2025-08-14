import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './modules/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: "full"
    },
    {
        path: "login",
        component: Login,
        canActivate: [authGuard],
        data: { requireAuth: false }
    },
    {
        path: "register",
        component: Register,
        canActivate: [authGuard],
        data: { requireAuth: false }
    },
    {
        path: "app",
        component: Layout,
        canActivate: [authGuard],
        data: { requireAuth: true, breadcrumb: '' },
        children: [
            {
                path: "patient",
                loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule),
                canActivate: [authGuard],
                data: { breadcrumb: 'Inicio', roles: ['Patient'] }
            }

        ]
    },

    { path: '**', redirectTo: '' }
];
