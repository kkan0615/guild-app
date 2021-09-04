import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationMutations, ApplicationMutationTypes } from '@/store/modules/applications/mutations'
import { ApplicationState } from '@/store/modules/applications/state'
import { Toast } from '@/types/systems/toast'

export enum ApplicationActionTypes {
  ADD_TOAST = 'application/ADD_TOAST',
  REMOVE_TOAST = 'application/REMOVE_TOAST',
}

export type AugmentedActionContext = {
  commit<K extends keyof ApplicationMutations>(
    key: K,
    payload: Parameters<ApplicationMutations[K]>[1]
  ): ReturnType<ApplicationMutations[K]>
} & Omit<ActionContext<ApplicationState, RootState>, 'commit'>

export interface ApplicationActions {
  [ApplicationActionTypes.ADD_TOAST](
    { commit }: AugmentedActionContext,
    payload: Toast
  ): void
  [ApplicationActionTypes.REMOVE_TOAST](
    { commit }: AugmentedActionContext,
    payload: Toast
  ): void
}

export const applicationActions: ActionTree<ApplicationState, RootState> & ApplicationActions = {
  [ApplicationActionTypes.ADD_TOAST] ({ commit }, payload) {
    commit(ApplicationMutationTypes.ADD_TOAST, payload)
  },
  [ApplicationActionTypes.REMOVE_TOAST] ({ commit }, payload) {
    commit(ApplicationMutationTypes.REMOVE_TOAST, payload)
  },
}
