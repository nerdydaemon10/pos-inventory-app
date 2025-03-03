import _ from 'lodash'
import { produce } from 'immer'
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { SharedPrefsService } from './core/services/shared-prefs.service'

type AppState = {
  darkMode: boolean
}

const initialState: AppState = {
  darkMode: SharedPrefsService.get('darkMode')
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store
  ) => ({
    toggleDarkMode: (): void => {
      patchState(store, (state) => {
        return produce(state, (draft) => {
          draft.darkMode = !draft.darkMode
        })
      })
      
      SharedPrefsService.set('darkMode', store.darkMode())
    }
  }))
)