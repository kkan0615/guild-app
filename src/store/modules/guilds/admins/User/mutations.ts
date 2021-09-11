import { MutationTree } from 'vuex'
import { GuildAdminUserState } from './state'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import { GuildUserSelectListQuery } from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'
import _ from 'lodash'

export enum GuildAdminUserMutationTypes {
  SET_GUILD_JOIN_FORMS = 'guildAdminUser/SET_GUILD_JOIN_FORMS',
  SET_USER_FILTER_OPTION = 'guildAdminUser/SET_USER_FILTER_OPTION',
  SET_BLACK_LIST = 'guildAdminUser/SET_BLACK_LIST',
}
export type GuildAdminUserMutations<S = GuildAdminUserState> = {
  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS](state: S, payload: Array<GuildJoinInfo>): void
  [GuildAdminUserMutationTypes.SET_USER_FILTER_OPTION](state: S, payload: GuildUserSelectListQuery): void
  [GuildAdminUserMutationTypes.SET_BLACK_LIST](state: S, payload: Array<GuildBlackInfo>): void
}

export const guildAdminUserMutations: MutationTree<GuildAdminUserState> & GuildAdminUserMutations = {
  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS] (state, payload) {
    state.joinForms = payload
  },
  [GuildAdminUserMutationTypes.SET_USER_FILTER_OPTION] (state, payload) {
    state.userFilterOption = payload
  },
  [GuildAdminUserMutationTypes.SET_BLACK_LIST] (state, payload) {
    state.blackList = _.cloneDeep(payload)
  },
}
