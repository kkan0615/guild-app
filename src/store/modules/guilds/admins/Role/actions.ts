import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminRoleMutations, GuildAdminRoleMutationTypes } from '@/store/modules/guilds/admins/Role/mutations'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { GuildRoleAtAdmin, GuildRoleUpdateForm } from '@/types/model/guilds/role'
import { dummyGuildUsers } from '@/dummy/user'

export enum GuildAdminRoleActionTypes {
  LOAD_ROLE_LIST = 'guildAdminRole/LOAD_ROLE_LIST',
  RESET_ROLE_LIST = 'guildAdminRole/RESET_ROLE_LIST',
  LOAD_SELECTED_ROLE = 'guildAdminRole/LOAD_SELECTED_ROLE',
  RESET_SELECTED_ROLE = 'guildAdminRole/RESET_SELECTED_ROLE',
  SET_MODE = 'guildAdminRole/SET_MODE',
  UPDATE_ROLE = 'guildAdminRole/UPDATE_ROLE',
  DELETE_ROLE = 'guildAdminRole/DELETE_ROLE',
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
   * @param payload - selected role id
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
  /**
   * SET ROLE MODE
   * @param commit
   * @param payload
   */
  [GuildAdminRoleActionTypes.SET_MODE](
    { commit }: AugmentedActionContext,
    payload: 'READ' | 'UPDATE',
  ): void

  /**
   * Update role information
   * @param commit
   * @param payload
   */
  [GuildAdminRoleActionTypes.UPDATE_ROLE](
    { commit }: AugmentedActionContext,
    payload: GuildRoleUpdateForm,
  ): void
  /**
   * Delete  role
   * @param commit
   * @param payload - role id
   */
  [GuildAdminRoleActionTypes.DELETE_ROLE](
    { commit }: AugmentedActionContext,
    payload: string,
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
      const guildRolesRes = dummyGuildRoles.find(dgr => dgr.uid === payload)
      if (guildRolesRes) {
        const userRes = dummyGuildUsers.filter(dgu => dgu.roleId === guildRolesRes.uid)
        commit(GuildAdminRoleMutationTypes.SET_SELECTED_ROLE, {
          ...guildRolesRes,
          Users: userRes,
        })
      } else {
        throw new Error('no guild role')
      }
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminRoleActionTypes.RESET_SELECTED_ROLE] ({ commit }) {
    commit(GuildAdminRoleMutationTypes.SET_SELECTED_ROLE, {} as GuildRoleAtAdmin)
  },
  [GuildAdminRoleActionTypes.SET_MODE] ({ commit }, payload) {
    commit(GuildAdminRoleMutationTypes.SET_MODE, payload)
  },
  [GuildAdminRoleActionTypes.UPDATE_ROLE] ({ commit }, payload) {
    const guildRolesRes = dummyGuildRoles.find(dgr => dgr.uid === payload.uid)
    if (guildRolesRes) {
      guildRolesRes.name = payload.name
      guildRolesRes.color = payload.color
      guildRolesRes.default = payload.default
    } else {
      throw new Error('no guild role')
    }
  },
  [GuildAdminRoleActionTypes.DELETE_ROLE] ({ commit }, payload) {
    const foundIndex = dummyGuildRoles.findIndex(dgr => dgr.uid === payload)
    if (foundIndex >= 0) {
      dummyGuildRoles.splice(foundIndex, 1)
    } else {
      throw new Error('no guild role')
    }
  },
}
