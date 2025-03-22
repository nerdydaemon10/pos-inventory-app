import _ from 'lodash';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SidebarMenu } from './sidebar-menu.type';

@Component({
  selector: 'pos-sidebar-menu',
  imports: [CommonModule, RippleModule],
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

  protected isTitle(menu: SidebarMenu): boolean {
    return _.isNil(menu.icon) && _.isNil(menu.route)
  }
  protected isActive(menu: SidebarMenu): boolean {
    const active = _.defaultTo(menu.active, false)
    const open = _.defaultTo(menu.open, false)
    return active || open
  }
  protected isOpen(menu: SidebarMenu): boolean {
    const open = _.defaultTo(menu.open, false)
    return open
  }

  protected click(event: Event, menu: SidebarMenu): void {
    event.stopPropagation()
    
    if (this.hasItems(menu)) {
      this.toggle.emit(menu)
    } else {
      this.navigate.emit(menu.route)
    }
  }

  protected hasItems(menu: SidebarMenu): boolean {
    return !_.isEmpty(menu.items)
  }
}
