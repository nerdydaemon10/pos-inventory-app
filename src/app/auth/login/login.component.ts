import { Component, effect, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MessageModule } from 'primeng/message'
import { PasswordModule } from 'primeng/password';

import { DividerComponent } from '../../shared/components/divider/divider.component'
import { LoginStore } from './login.store'
import { Router } from '@angular/router'
import { ToasterStore } from '../../shared/stores/toaster.store'

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
  protected form!: FormGroup
  protected readonly login = inject(LoginStore)
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
      if (this.login.success()) {
        this.router.navigate(["dashboard"])
      }
    })
  }

  protected onSubmit(): void {
    this.login.submit(this.form.value)
  }
}
