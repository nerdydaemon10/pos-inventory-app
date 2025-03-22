import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from "./header/header.component";
import { AppStore } from '../app.store';
import { AuthStore } from '../auth/auth.store';
import { BreadcrumbComponent } from "./ui/breadcrumb/breadcrumb.component";
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'pos-dashboard',
  imports: [NgScrollbar, NgScrollbarModule, ButtonModule, RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected readonly app = inject(AppStore)
  protected readonly auth = inject(AuthStore)

  constructor(
    private router: Router
  ) {}
  
  protected logout(): void {
    this.auth.logout()
    this.router.navigate([''])
  }
}