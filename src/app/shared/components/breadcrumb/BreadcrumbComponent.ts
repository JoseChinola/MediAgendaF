import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../models/breadcrumb.model';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';


@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink],
  templateUrl: './BreadcrumbComponent.html'
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
