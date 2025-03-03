import { Component, inject, OnInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarStore } from './sidebar.store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import _ from 'lodash';
import { AppStore } from '../../app.store';
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { filter } from 'rxjs';
import { SidebarMenu } from './sidebar-menu/sidebar-menu.type';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgScrollbar,
    ButtonModule,
    CommonModule,
    ScrollPanelModule,
    SidebarMenuComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  protected readonly app = inject(AppStore)
  protected readonly sidebar = inject(SidebarStore)

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sidebar.init(this.router.url)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.sidebar.init(event.url)
    })
  }
  protected toggle(menu: SidebarMenu): void {
    this.sidebar.toggle(menu)
  }
  protected navigate(route: string): void {
    this.router.navigate([route], { relativeTo: this.route})
  }
}
