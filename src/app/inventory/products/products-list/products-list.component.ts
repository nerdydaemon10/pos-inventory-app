import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Product } from '../product.model';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'pos-products-list',
  imports: [TableModule, ButtonModule, BadgeModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  protected products: Product[] = [
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    },
    {
      id: 1,
      sku: "KBD-K12",
      code: "123456789",
      name: "Keychron K12",
      brand: "Keychron",
      category: "Keyboard"
    }
  ]
}
