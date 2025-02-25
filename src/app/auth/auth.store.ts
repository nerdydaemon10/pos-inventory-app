import _ from 'lodash'
import { produce} from 'immer'
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals'
import { computed } from '@angular/core'
import { SharedPrefsService } from '../core/services/shared-prefs.service'
import { User } from '../users/user.type'

type AuthState = {
  user: User | null
}

const initialState: AuthState = {
  user: SharedPrefsService.get<User>('user')
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    isAuthenticated: computed(() => !_.isNil(state.user))
  })),
  withMethods((store) => ({
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