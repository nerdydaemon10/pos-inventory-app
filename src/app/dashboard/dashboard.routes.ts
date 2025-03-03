import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./overview/overview.component").then(c => c.OverviewComponent)
  }
]