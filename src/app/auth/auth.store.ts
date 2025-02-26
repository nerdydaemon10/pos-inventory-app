import _ from 'lodash'
import { produce} from 'immer'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed, inject } from '@angular/core'
import { SharedPrefsService } from '../core/services/shared-prefs.service'
import { User } from '../users/user.type'
import { AuthService } from './auth.service'
import { LoginDto } from './login/login.dto'
import { finalize } from 'rxjs'
import { HttpStatusCode } from '@angular/common/http'

export type LoginState = {
  loading: boolean,
  success: boolean,
  message: string
}

type AuthState = {
  user: User | null,
  login: LoginState
}

const initialState: AuthState = {
  user: SharedPrefsService.get<User>('user'),
  login: { loading: false, success: false, message: "" }
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    isInvalidCredentials: computed(() => !state.login.success() && !_.isEmpty(state.login.message())),
    isAuthenticated: computed(() => !_.isNil(state.user()))
  })),
  withMethods((
    store, 
    service: AuthService = inject(AuthService)
  ) => ({
    submit(dto: LoginDto): void {
      patchState(store, (state) =>
        produce(state, (draft) => {
          draft.login.loading = true
          draft.login.success = false
          draft.login.message = ""
        })
      )
      
      service.login(dto).pipe(
        finalize(() => 
          patchState(store, (state) => {
            return produce(state, (draft) => {
              draft.login.loading = false
            })
          })
        )
      ).subscribe(res => {
        if (!res.success && res.code != HttpStatusCode.Unauthorized) {
          return
        }

        SharedPrefsService.set('user', res.data)

        patchState(store, (state) => {
          return produce(state, (draft) => {
            draft.user = res.data
            draft.login.success = res.success
            draft.login.message = res.message
          }) 
        })
      })
    },
    logout(): void {
      SharedPrefsService.clear()
      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.user = null
        })
      })
    }
  }))
)