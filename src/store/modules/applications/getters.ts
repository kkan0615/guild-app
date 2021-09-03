import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationState } from '@/store/modules/applications/state'

export type ApplicationGetters<S = ApplicationState> = {
  snackbars(state: S): Array<any>
}

export const applicationGetters: GetterTree<ApplicationState, RootState> & ApplicationGetters = {
  snackbars: (state) => state.snackbars,
}
