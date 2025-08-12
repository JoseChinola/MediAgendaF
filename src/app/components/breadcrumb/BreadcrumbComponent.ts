import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../core/models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './BreadcrumbComponent.html',
  styleUrl: './BreadcrumbComponent.css'
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(bc => {
      this.breadcrumbs = bc;
    })
  }
}
