import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  currentYear: number = new Date().getFullYear();

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user')
  }

  logout() {
    localStorage.removeItem('user');
  }
}
