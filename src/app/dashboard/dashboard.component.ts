import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'pos-dashboard',
  imports: [ButtonModule, RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private service: AuthService) {}
}
