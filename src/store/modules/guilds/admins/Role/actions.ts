import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminRoleMutations, GuildAdminRoleMutationTypes } from '@/store/modules/guilds/admins/Role/mutations'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { GuildRole } from '@/types/model/guilds/role'

export enum GuildAdminRoleActionTypes {
  LOAD_ROLE_LIST = 'guildAdminRole/LOAD_ROLE_LIST',
  RESET_ROLE_LIST = 'guildAdminRole/RESET_ROLE_LIST',
  LOAD_SELECTED_ROLE = 'guildAdminRole/LOAD_SELECTED_ROLE',
  RESET_SELECTED_ROLE = 'guildAdminRole/RESET_SELECTED_ROLE',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAdminRoleMutations>(
    key: K,
    payload?: Parameters<GuildAdminRoleMutations[K]>[1]
  ): ReturnType<GuildAdminRoleMutations[K]>
} & Omit<ActionContext<GuildAdminRoleState, RootState>, 'commit'>

export interface GuildAdminRoleActions {
  /**
   * Load user list
   * @param commit
   * @param rootState
   */
  [GuildAdminRoleActionTypes.LOAD_ROLE_LIST](
    { commit, rootState }: AugmentedActionContext,
  ): void
  /**
   * Reset user list
   * @param commit
   */
  [GuildAdminRoleActionTypes.RESET_ROLE_LIST](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Load user list
   * @param commit
   * @param rootState
   */
  [GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE](
    { commit, rootState }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Reset user list
   * @param commit
   */
  [GuildAdminRoleActionTypes.RESET_SELECTED_ROLE](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildAdminRoleActions: ActionTree<GuildAdminRoleState, RootState> & GuildAdminRoleActions = {
  [GuildAdminRoleActionTypes.LOAD_ROLE_LIST] ({ commit, rootState }) {
    const guildUid = rootState.guild.guildInfo.uid
    if (guildUid) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === guildUid)
      commit(GuildAdminRoleMutationTypes.SET_ROLE_LIST, guildRolesRes)
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminRoleActionTypes.RESET_ROLE_LIST] ({ commit }) {
    commit(GuildAdminRoleMutationTypes.SET_ROLE_LIST, [])
  },
  [GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE] ({ commit, rootState }, payload) {
    const guildUid = rootState.guild.guildInfo.uid
    if (guildUid) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === guildUid).find(dgr => dgr.uid === payload)
      if (guildRolesRes)
        commit(GuildAdminRoleMutationTypes.SET_SELECTED_ROLE, guildRolesRes)
      else {
        throw new Error('no guild role')
      }
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminRoleActionTypes.RESET_SELECTED_ROLE] ({ commit }) {
    commit(GuildAdminRoleMutationTypes.SET_SELECTED_ROLE, {} as GuildRole)
  },
}
