import { Routes } from "@angular/router";

export const InventoryRoutes: Routes = [
  {
    path: "products",
    loadComponent: () => import("./products/products-list/products-list.component").then(c => c.ProductsListComponent)
  }
]