import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationState } from '@/store/modules/applications/state'

export type ApplicationGetters<S = ApplicationState> = {
  toasts(state: S): Array<any>
}

export const applicationGetters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  toasts: (state) => state.toasts,
}
