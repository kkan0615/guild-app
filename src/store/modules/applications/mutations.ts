import { MutationTree } from 'vuex'
import { ApplicationState } from './state'
import { Toast } from '@/types/systems/toast'

export enum ApplicationMutationTypes {
  SET_TOASTS = 'application/SET_TOASTS',
  ADD_TOAST = 'application/ADD_TOAST',
  REMOVE_TOAST = 'application/REMOVE_TOAST',
}
export type ApplicationMutations<S = ApplicationState> = {
  [ApplicationMutationTypes.SET_TOASTS](state: S, payload: Array<Toast>): void
  [ApplicationMutationTypes.ADD_TOAST](state: S, payload: Toast): void
  [ApplicationMutationTypes.REMOVE_TOAST](state: S, payload: Toast): void
}

export const applicationMutations: MutationTree<ApplicationState> & ApplicationMutations = {
  [ApplicationMutationTypes.SET_TOASTS] (state, payload) {
    state.toasts = payload
  },
  [ApplicationMutationTypes.ADD_TOAST] (state, payload) {
    state.toasts.push(payload)
  },
  [ApplicationMutationTypes.REMOVE_TOAST] (state, payload) {
    state.toasts.splice(state.toasts.indexOf(payload), 1)
  },
}
