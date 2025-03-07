import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'pos-header',
  imports: [ButtonModule, DividerModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() public darkMode: boolean = false
  @Output() public darkModeToggle: EventEmitter<null> = new EventEmitter()
  @Output() public logout: EventEmitter<null> = new EventEmitter()

  protected onDarkModeToggle(): void {
    this.darkModeToggle.emit()
  }
  
  protected items: MenuItem[] = [
    { 
      label: 'Profile', 
      items: [
        {
          label: 'Logout', icon: 'bx bx-log-out',
          command: () => {
            this.logout.emit()
          }
        }
      ] 
    }
  ];
}
