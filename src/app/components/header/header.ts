import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/BreadcrumbComponent";
import { ThemeService } from '../../core/services/theme.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';


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

  constructor(public themeService: ThemeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Obtener el nombre completo del usuario desde AuthService
    this.authService.currentUser$.subscribe(user => {
      this.fullName = user ? user.fullName : '';
      this.initials = this.fullName ? this.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '';
    })
  }

  toggleSelection(num: number) {
    this.selectedIcon = num;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
