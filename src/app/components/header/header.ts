import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../breadcrumb/BreadcrumbComponent";
import { ThemeService } from '../../core/services/theme.service';


@Component({
  selector: 'app-header',
  imports: [BreadcrumbComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  selectedIcon = 1;
  constructor(public themeService: ThemeService) { }

  toggleSelection(num: number) {
    this.selectedIcon = num;
  }
}
