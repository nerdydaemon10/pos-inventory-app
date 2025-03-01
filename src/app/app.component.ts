import _ from 'lodash';
import { ToastModule } from 'primeng/toast'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { Component, effect, inject } from '@angular/core'

import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pos-inventory-app';
  private readonly store = inject(AppStore)
  private readonly html: HTMLElement | null = document.querySelector('html')
  
  constructor() {
    effect(() => {
      if (_.isNil(this.html)) return
      if (this.store.darkMode()) {
        this.html.classList.add('dark')
        return
      }
      this.html.classList.remove('dark')
    })
  }
}
