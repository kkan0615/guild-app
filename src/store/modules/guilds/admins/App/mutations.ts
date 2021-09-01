import { MutationTree } from 'vuex'
import { GuildAdminAppState } from './state'

export enum GuildAdminAppMutationTypes {
  SET_IS_OPEN_SIDEBAR = 'guildAdminApp/SET_IS_OPEN_SIDEBAR',
}
export type GuildAdminAppMutations<S = GuildAdminAppState> = {
  [GuildAdminAppMutationTypes.SET_IS_OPEN_SIDEBAR](state: S, payload: boolean): void
}

export const guildAdminAppMutations: MutationTree<GuildAdminAppState> & GuildAdminAppMutations = {
  [GuildAdminAppMutationTypes.SET_IS_OPEN_SIDEBAR] (state, payload) {
    state.isOpenSideBar = payload
  },
}
