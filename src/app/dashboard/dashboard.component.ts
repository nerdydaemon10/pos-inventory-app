import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from "./header/header.component";
import { AppStore } from '../app.store';

@Component({
  selector: 'pos-dashboard',
  imports: [ButtonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected readonly store = inject(AppStore)
  constructor() {}
}