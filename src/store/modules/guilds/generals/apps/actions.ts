import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAppMutations, GuildAppMutationTypes } from './mutations'
import { GuildAppState } from './state'

export enum GuildAppActionTypes {
  LOAD_NOTICE_LIST = 'guildNotice/LOAD_NOTICE_LIST',
  RESET_NOTICE_LIST = 'guildNotice/RESET_NOTICE_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAppMutations>(
    key: K,
    payload: Parameters<GuildAppMutations[K]>[1]
  ): ReturnType<GuildAppMutations[K]>
} & Omit<ActionContext<GuildAppState, RootState>, 'commit'>

export interface GuildAppActions {
  [GuildAppActionTypes.LOAD_NOTICE_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildAppActionTypes.RESET_NOTICE_LIST](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildAppActions: ActionTree<GuildAppState, RootState> & GuildAppActions = {
  [GuildAppActionTypes.LOAD_NOTICE_LIST] ({ commit }) {
    console.log('LOAD_NOTICE_LIST')
    commit(GuildAppMutationTypes.SET_NOTICE_LIST, [])
  },
  [GuildAppActionTypes.RESET_NOTICE_LIST] ({ commit }) {
    commit(GuildAppMutationTypes.SET_NOTICE_LIST, [])
  },
}
