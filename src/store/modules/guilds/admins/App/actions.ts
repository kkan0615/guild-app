import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminAppMutations, GuildAdminAppMutationTypes } from '@/store/modules/guilds/admins/App/mutations'
import { GuildAdminAppState } from '@/store/modules/guilds/admins/App/state'

export enum GuildAdminAppActionTypes {
  OPEN_SIDEBAR = 'guildAdminApp/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'guildAdminApp/CLOSE_SIDEBAR',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAdminAppMutations>(
    key: K,
    payload?: Parameters<GuildAdminAppMutations[K]>[1]
  ): ReturnType<GuildAdminAppMutations[K]>
} & Omit<ActionContext<GuildAdminAppState, RootState>, 'commit'>

export interface GuildAdminAppActions {
  [GuildAdminAppActionTypes.OPEN_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildAdminAppActionTypes.CLOSE_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildAdminAppActions: ActionTree<GuildAdminAppState, RootState> & GuildAdminAppActions = {
  [GuildAdminAppActionTypes.OPEN_SIDEBAR] ({ commit }) {
    commit(GuildAdminAppMutationTypes.SET_IS_OPEN_SIDEBAR, true)
  },
  [GuildAdminAppActionTypes.CLOSE_SIDEBAR] ({ commit }) {
    commit(GuildAdminAppMutationTypes.SET_IS_OPEN_SIDEBAR, false)
  },
}
