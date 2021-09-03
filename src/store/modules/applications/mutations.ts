import { MutationTree } from 'vuex'
import { ApplicationState } from './state'

export enum ApplicationMutationTypes {
  ADD_SNACKBAR = 'application/ADD_SNACKBAR',
}
export type ApplicationMutations<S = ApplicationState> = {
  [ApplicationMutationTypes.ADD_SNACKBAR](state: S, payload: any): void
}

export const applicationMutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [ApplicationMutationTypes.ADD_SNACKBAR] (state, payload) {
    state.snackbars.push(payload)
  },
}
