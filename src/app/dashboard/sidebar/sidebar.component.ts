import _ from 'lodash';
import { filter } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';  
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { SidebarStore } from './sidebar.store';
import { AppStore } from '../../app.store';
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { SidebarMenu } from './sidebar-menu/sidebar-menu.type';

@Component({
  selector: 'pos-sidebar',
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
    this.sidebar.activate(this.router.url)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.sidebar.activate(event.url)
    })
  }
  protected toggle(menu: SidebarMenu): void {
    this.sidebar.toggle(menu)
  }
  protected navigate(route: string): void {
    this.router.navigate([route], { relativeTo: this.route})
  }
}
