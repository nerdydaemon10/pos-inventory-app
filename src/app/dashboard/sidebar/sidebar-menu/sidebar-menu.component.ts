import _ from 'lodash';
import { RippleModule } from 'primeng/ripple';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarMenu } from './sidebar-menu.type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pos-sidebar-menu',
  imports: [CommonModule, RippleModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css',
})
export class SidebarMenuComponent {
  @Input()
  public menus: SidebarMenu[] = []
  @Output()
  public toggle = new EventEmitter()

  @Output()
  public navigate = new EventEmitter()

  constructor() {}

  protected isMenuTitle(menu: SidebarMenu): boolean {
    return _.isNil(menu.icon) && _.isNil(menu.route)
  }

  protected click(event: Event, menu: SidebarMenu): void {
    event.stopPropagation()

    if (this.hasItems(menu)) {
      this.toggle.emit(menu)
      return
    }
    
    this.navigate.emit(menu.route)
  }

  protected hasItems(menu: SidebarMenu): boolean {
    return !_.isEmpty(menu.items)
  }
}
