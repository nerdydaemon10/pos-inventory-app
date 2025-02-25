import _ from 'lodash'
import { produce } from 'immer'
import { finalize } from 'rxjs'
import { Router } from '@angular/router'
import { computed, inject } from '@angular/core'
import { HttpStatusCode } from '@angular/common/http'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'

import { LoginDto } from './login.dto'
import { AuthService } from '../auth.service'
import { SharedPrefsService } from '../../core/services/shared-prefs.service'

export type LoginState = {
  loading: boolean,
  success: boolean,
  message: string
}

const initialState: LoginState = {
  loading: false,
  success: false,
  message: ''
}

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    hasError: computed(() => !state.success() && !_.isEmpty(state.message()))
  })),
  withMethods((
    store, 
    service: AuthService = inject(AuthService),
    router: Router = inject(Router)
  ) => ({
    submit(login: LoginDto): void {
      patchState(store, (state) =>
        produce(state, (draft) => {
          draft.loading = true
          draft.success = false
          draft.message = ""
        })
      )
      
      service.login(login).pipe(
        finalize(() => 
          patchState(store, (state) =>
            produce(state, (draft) => {
            draft.loading = false
          })
        ))
      ).subscribe(res => {
        if (!res.success && res.code != HttpStatusCode.Unauthorized) {
          return
        }

        SharedPrefsService.set('user', res.data)
        
        patchState(store, (state) => {
          return produce(state, (draft) => {
            draft.success = res.success
            draft.message = res.message
          }) 
        })
      })
    }
  }))
)