import { MutationTree } from 'vuex'
import { GuildAdminUserState } from './state'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import {
  GuildUserAtAdminDetail,
  GuildUserAtAdminUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'
import _ from 'lodash'
import { GuildRole } from '@/types/model/guilds/role'

export enum GuildAdminUserMutationTypes {
  SET_USER_LIST = 'guildAdminUser/SET_USER_LIST',
  SET_GUILD_JOIN_FORMS = 'guildAdminUser/SET_GUILD_JOIN_FORMS',
  SET_USER_FILTER_OPTION = 'guildAdminUser/SET_USER_FILTER_OPTION',
  SET_BLACK_LIST = 'guildAdminUser/SET_BLACK_LIST',
  SET_USER_DETAIL = 'guildAdminUser/SET_USER_DETAIL',
  SET_ROLE_LIST = 'guildAdminUser/SET_ROLE_LIST',
}
export type GuildAdminUserMutations<S = GuildAdminUserState> = {
  [GuildAdminUserMutationTypes.SET_USER_LIST](state: S, payload: Array<GuildUserAtAdminUserList>): void
  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS](state: S, payload: Array<GuildJoinInfo>): void
  [GuildAdminUserMutationTypes.SET_USER_FILTER_OPTION](state: S, payload: GuildUserSelectListQuery): void
  [GuildAdminUserMutationTypes.SET_BLACK_LIST](state: S, payload: Array<GuildBlackInfo>): void
  [GuildAdminUserMutationTypes.SET_USER_DETAIL](state: S, payload: GuildUserAtAdminDetail): void
  [GuildAdminUserMutationTypes.SET_ROLE_LIST](state: S, payload: Array<GuildRole>): void
}

export const guildAdminUserMutations: MutationTree<GuildAdminUserState> & GuildAdminUserMutations = {
  [GuildAdminUserMutationTypes.SET_USER_LIST] (state, payload) {
    state.userList = _.cloneDeep(payload)
  },  [GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS] (state, payload) {
    state.joinForms = payload
  },
  [GuildAdminUserMutationTypes.SET_USER_FILTER_OPTION] (state, payload) {
    state.userFilterOption = payload
  },
  [GuildAdminUserMutationTypes.SET_BLACK_LIST] (state, payload) {
    state.blackList = _.cloneDeep(payload)
  },
  [GuildAdminUserMutationTypes.SET_USER_DETAIL] (state, payload) {
    state.userDetail = _.cloneDeep(payload)
  },
  [GuildAdminUserMutationTypes.SET_ROLE_LIST] (state, payload) {
    state.roleList = _.cloneDeep(payload)
  },
}
