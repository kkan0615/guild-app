import { MutationTree } from 'vuex'
import { GuildAdminRoleState } from './state'
import _ from 'lodash'
import { GuildRole, GuildRoleAtAdmin } from '@/types/model/guilds/role'

export enum GuildAdminRoleMutationTypes {
  SET_ROLE_LIST = 'guildAdminRole/SET_ROLE_LIST',
  SET_SELECTED_ROLE = 'guildAdminRole/SET_SELECTED_ROLE',
  SET_MODE = 'guildAdminRole/SET_MODE',
}
export type GuildAdminRoleMutations<S = GuildAdminRoleState> = {
  [GuildAdminRoleMutationTypes.SET_ROLE_LIST](state: S, payload: Array<GuildRole>): void
  [GuildAdminRoleMutationTypes.SET_SELECTED_ROLE](state: S, payload: GuildRoleAtAdmin): void
  [GuildAdminRoleMutationTypes.SET_MODE](state: S, payload: 'READ' | 'UPDATE'): void
}

export const guildAdminRoleMutations: MutationTree<GuildAdminRoleState> & GuildAdminRoleMutations = {
  [GuildAdminRoleMutationTypes.SET_ROLE_LIST] (state, payload) {
    state.roleList = _.cloneDeep(payload)
  },
  [GuildAdminRoleMutationTypes.SET_SELECTED_ROLE] (state, payload) {
    state.selectedRole = _.cloneDeep(payload)
  },
  [GuildAdminRoleMutationTypes.SET_MODE] (state, payload) {
    state.mode = payload
  },
}
