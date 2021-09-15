import { MutationTree } from 'vuex'
import { GuildAdminRoleState } from './state'
import _ from 'lodash'
import { GuildRole } from '@/types/model/guilds/role'

export enum GuildAdminRoleMutationTypes {
  SET_ROLE_LIST = 'guildAdminRole/SET_ROLE_LIST',
  SET_SELECTED_ROLE = 'guildAdminRole/SET_SELECTED_ROLE',
}
export type GuildAdminRoleMutations<S = GuildAdminRoleState> = {
  [GuildAdminRoleMutationTypes.SET_ROLE_LIST](state: S, payload: Array<GuildRole>): void
  [GuildAdminRoleMutationTypes.SET_SELECTED_ROLE](state: S, payload: GuildRole): void
}

export const guildAdminRoleMutations: MutationTree<GuildAdminRoleState> & GuildAdminRoleMutations = {
  [GuildAdminRoleMutationTypes.SET_ROLE_LIST] (state, payload) {
    state.roleList = _.cloneDeep(payload)
  },
  [GuildAdminRoleMutationTypes.SET_SELECTED_ROLE] (state, payload) {
    state.selectedRole = _.cloneDeep(payload)
  },
}
