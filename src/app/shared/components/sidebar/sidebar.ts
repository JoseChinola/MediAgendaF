import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Footer } from "../footer/footer";
import { MenuItem } from '../../models/menuItem.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, Footer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  menu: MenuItem[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {

    const userRole = this.authService.getRole();

    if (!userRole) {
      this.menu = [];
      return;
    }

    if (userRole === 'Patient') {
      this.menu = [
        {
          label: 'Home',
          icon: 'fas fa-home',
          items: [
            {
              label: 'Dashboard',
              icon: 'fas fa-tachometer-alt',
              to: '/app/patient'
            },
            {
              label: 'Citas',
              icon: 'fas fa-calendar-alt',
              to: '/app/patient/appointments'
            }
          ]
        },
        {
          label: 'Configuracion',
          icon: 'fas fa-cog',
          items: [
            {
              label: 'Perfil',
              icon: 'fas fa-user',
              to: '/app/patient/setting/profile'
            },
            {
              label: 'Seguridad',
              icon: 'fas fa-lock',
              to: '/app/patient/setting/security'
            }
          ]
        }
      ]
    } else if (userRole === 'Admin') {
      this.menu = [
        {
          label: 'Home',
          icon: 'fas fa-home',
          items: [
            {
              label: 'Dashboard',
              icon: 'fas fa-tachometer-alt',
              to: '/app/admin'
            },
            {
              label: 'Recepcion',
              icon: 'fas fa-user-md',
              to: '/app/admin/reception'
            },
            {
              label: 'Pacientes',
              icon: 'fas fa-user-md',
              to: '/app/admin/patients'
            },
            {
              label: 'Doctor',
              icon: 'fas fa-user-md',
              to: '/app/admin/doctors'
            },
            {
              label: 'Citas',
              icon: 'fas fa-calendar-alt',
              to: '/app/admin/appointments'
            }
          ]
        },
        { separator: true },
        {
          label: 'Security',
          icon: 'fas fa-shield-alt',
          items: [
            {
              label: 'Permisos',
              icon: 'fas fa-key',
              to: '/app/admin/security/permisos'
            },
            {
              label: 'Roles',
              icon: 'fas fa-unlock',
              to: '/app/admin/security/roles'
            },
            {
              label: 'Users',
              icon: 'fas fa-users',
              to: '/app/admin/security/users'
            }
          ]
        }
      ]
    }
  }

}
