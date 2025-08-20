import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { BreadcrumbComponent } from '../breadcrumb/BreadcrumbComponent';



@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent, CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  selectedIcon = 1;
  fullName: string = '';
  initials: string = '';
  currentRole: string = '';

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedIcon = this.themeService.isDarkMode() ? 1 : 2;

    // Obtener el nombre completo del usuario desde AuthService
    this.authService.currentUser$.subscribe(user => {
      this.fullName = user ? user.fullName : '';
      this.initials = this.fullName ? this.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '';
      this.currentRole = user ? user.role.toLowerCase() : '';
    })
  }

  toggleSelection(num: number) {
    if (num === 1 && !this.themeService.isDarkMode()) {
      this.themeService.toggleTheme();
    } else if (num === 2 && this.themeService.isDarkMode()) {
      this.themeService.toggleTheme();
    }

    // Siempre actualizar el icono visible
    this.selectedIcon = num;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
