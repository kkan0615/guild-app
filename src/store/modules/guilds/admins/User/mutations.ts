import { MutationTree } from 'vuex'
import { GuildAdminUserState } from './state'
import { GuildJoinInfo } from '@/types/model/guilds/join'

export enum GuildAdminUserMutationTypes {
  SET_GUILD_JOIN_FORMS = 'guildAdminUser/SET_GUILD_JOIN_FORMS',
}
export type GuildAdminUserMutations<S = GuildAdminUserState> = {
  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS](state: S, payload: Array<GuildJoinInfo>): void
}

export const guildAdminUserMutations: MutationTree<GuildAdminUserState> & GuildAdminUserMutations = {
  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS] (state, payload) {
    state.joinForms = payload
  },
}
