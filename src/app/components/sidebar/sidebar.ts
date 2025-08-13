import { Component } from '@angular/core';
import { MenuItem } from '../../core/models/menuItem.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive, Footer],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  menu: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fas fa-home',
      to: '/',
      items: [
        {
          label: 'Dashboard',
          icon: 'fas fa-tachometer-alt',
          to: '/dashboard'
        },
        {
          label: 'Reception',
          icon: 'fas fa-user',
          to: '/reception'
        },
        {
          label: 'Patient',
          icon: 'fas fa-user',
          to: '/patient'
        },
        {
          label: 'Doctor',
          icon: 'fas fa-user',
          to: '/doctor'
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
          to: '/security/permisos'
        },
        {
          label: 'Roles',
          icon: 'fas fa-unlock',
          to: '/security/roles'
        },
        {
          label: 'Users',
          icon: 'fas fa-users',
          to: '/security/users'
        }
      ]
    }
  ];

}
