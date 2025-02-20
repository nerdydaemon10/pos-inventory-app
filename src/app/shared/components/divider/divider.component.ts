import _ from 'lodash'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-divider',
  imports: [],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {
  @Input()
  public text?: string

  protected hasText() {
    return !_.isNil(this.text) && !_.isEmpty(this.text)
  }
}
