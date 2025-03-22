import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { Component, effect, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MessageModule } from 'primeng/message'
import { PasswordModule } from 'primeng/password';

import { ToasterStore } from '../../shared/stores/toaster.store'
import { AuthStore, LoginState } from '../auth.store'
import { DividerComponent } from '../../shared/components/divider/divider.component'

@Component({
  selector: 'pos-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule, 
    PasswordModule,
    MessageModule,
    ButtonModule, 
    CheckboxModule,
    DividerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  protected readonly form!: FormGroup //late initialization
  protected readonly store = inject(AuthStore)
  protected readonly toaster = inject(ToasterStore)

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    effect(() => {
      if (this.login.success) {
        this.toaster.success(this.login.message)
        this.router.navigate(["dashboard"])
      }
    })
  }

  protected onSubmit(): void {
    this.store.submit(this.form.value)
  }
  
  protected get login(): LoginState {
    return this.store.login()
  }
}
