import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DividerComponent } from "../../shared/components/divider/divider.component";


@Component({
  selector: 'pos-header',
  imports: [ButtonModule, DividerModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input()
  public darkMode: boolean = false
  
  @Output()
  public toggle: EventEmitter<null> = new EventEmitter()

  protected onToggle(): void {
    this.toggle.emit()
  }

  items = [
    { 
      label: 'Profile', 
      items: [
        {
          label: 'Logout', icon: 'bx bx-log-out'
        }
      ] 
    }
  ];
}
