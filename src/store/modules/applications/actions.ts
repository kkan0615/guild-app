import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { ApplicationMutations, ApplicationMutationTypes } from '@/store/modules/applications/mutations'
import { ApplicationState } from '@/store/modules/applications/state'

export enum ApplicationActionTypes {
  ADD_SNACKBAR = 'application/ADD_SNACKBAR',
}

export type AugmentedActionContext = {
  commit<K extends keyof ApplicationMutations>(
    key: K,
    payload: Parameters<ApplicationMutations[K]>[1]
  ): ReturnType<ApplicationMutations[K]>
} & Omit<ActionContext<ApplicationState, RootState>, 'commit'>

export interface ApplicationActions {
  [ApplicationActionTypes.ADD_SNACKBAR](
    { commit }: AugmentedActionContext,
  ): void
}

export const applicationActions: ActionTree<ApplicationState, RootState> & ApplicationActions = {
  [ApplicationActionTypes.ADD_SNACKBAR] ({ commit }) {
    commit(ApplicationMutationTypes.ADD_SNACKBAR, {})
  },
}
