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
  constructor(public themeService: ThemeService) {}
}
