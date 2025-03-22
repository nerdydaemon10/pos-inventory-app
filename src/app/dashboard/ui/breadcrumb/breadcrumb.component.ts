import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BreadcrumbItem } from './breadcrumb-item.type';
import { RouteHelper } from '../../../core/helpers/route.helper';
import { filter } from 'rxjs';

@Component({
  selector: 'pos-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
  protected items: BreadcrumbItem[] = [
    {
      route: "products",
      name: "Products"
    },
    {
      route: "create",
      name: "Create Product"
    },
  ]
  
  constructor(
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      
    })
  }

  protected get routes(): string[] {
    console.log(RouteHelper.sanitize(this.router.url).split("/"));
    
    return RouteHelper.sanitize(this.router.url).split("/")
  }
}
