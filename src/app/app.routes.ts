import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: "",
    canActivate: [GuestGuard],
    children: authRoutes
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import("./dashboard/dashboard.routes").then(r => r.dashboardRoutes)
  }
];
