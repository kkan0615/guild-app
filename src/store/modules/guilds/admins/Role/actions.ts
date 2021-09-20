import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminRoleMutations, GuildAdminRoleMutationTypes } from '@/store/modules/guilds/admins/Role/mutations'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { GuildRole, GuildRoleAtAdmin, GuildRoleCreateForm, GuildRoleUpdateForm } from '@/types/model/guilds/role'
import { dummyGuildUsers } from '@/dummy/user'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

export enum GuildAdminRoleActionTypes {
  LOAD_ROLE_LIST = 'guildAdminRole/LOAD_ROLE_LIST',
  RESET_ROLE_LIST = 'guildAdminRole/RESET_ROLE_LIST',
  LOAD_SELECTED_ROLE = 'guildAdminRole/LOAD_SELECTED_ROLE',
  RESET_SELECTED_ROLE = 'guildAdminRole/RESET_SELECTED_ROLE',
  SET_MODE = 'guildAdminRole/SET_MODE',
  CREATE_ROLE = 'guildAdminRole/CREATE_ROLE',
  UPDATE_ROLE = 'guildAdminRole/UPDATE_ROLE',
  DELETE_ROLE = 'guildAdminRole/DELETE_ROLE',
  CHANGE_MEMBER_ROLE = 'guildAdminRole/CHANGE_MEMBER_ROLE',
  ROLE_INDEX_UP = 'guildAdminRole/ROLE_INDEX_UP',
  ROLE_INDEX_DOWN = 'guildAdminRole/ROLE_INDEX_DOWN',
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
   * Create role information
   * @param commit
   * @param payload
   */
  [GuildAdminRoleActionTypes.CREATE_ROLE](
    { commit }: AugmentedActionContext,
    payload: GuildRoleCreateForm,
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

  /**
   * Change member role (add and remove)
   * @param state
   * @param payload - target user id
   */
  [GuildAdminRoleActionTypes.CHANGE_MEMBER_ROLE](
    { state } : AugmentedActionContext,
    payload: string,
  ): void
  [GuildAdminRoleActionTypes.ROLE_INDEX_UP](
    { state } : AugmentedActionContext,
    payload: GuildRole,
  ): void
  [GuildAdminRoleActionTypes.ROLE_INDEX_DOWN](
    { state } : AugmentedActionContext,
    payload: GuildRole,
  ): void
}

export const guildAdminRoleActions: ActionTree<GuildAdminRoleState, RootState> & GuildAdminRoleActions = {
  [GuildAdminRoleActionTypes.LOAD_ROLE_LIST] ({ commit, rootState }) {
    const guildId = rootState.guild.guildInfo.id
    if (guildId) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === guildId)
      if (guildRolesRes.some(guildRolesRes => guildRolesRes.index === undefined)) {
        guildRolesRes.map((guildRoleRes, index) => {
          guildRoleRes.index = index
        })
      }
      guildRolesRes.sort(((a, b) => a.index - b.index))
      commit(GuildAdminRoleMutationTypes.SET_ROLE_LIST, guildRolesRes)
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminRoleActionTypes.RESET_ROLE_LIST] ({ commit }) {
    commit(GuildAdminRoleMutationTypes.SET_ROLE_LIST, [])
  },
  [GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE] ({ commit, rootState }, payload) {
    const guildUid = rootState.guild.guildInfo.id
    if (guildUid) {
      const guildRolesRes = dummyGuildRoles.find(dgr => dgr.id === payload)
      if (guildRolesRes) {
        const userRes = dummyGuildUsers.filter(dgu => dgu.roleId === guildRolesRes.id)
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
  [GuildAdminRoleActionTypes.CREATE_ROLE] ({ rootState }, payload) {
    const newRoleId = v4()

    /* Change default role */
    if (payload.default === true) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === rootState.guild.guildInfo.id)
      guildRolesRes.forEach(grr => grr.default = false)
    }

    dummyGuildRoles.push({
      id: newRoleId,
      guildId: rootState.guild.guildInfo.id,
      ...payload,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newRoleId
  },
  [GuildAdminRoleActionTypes.UPDATE_ROLE] ({ state }, payload) {
    const guildRoleRes = dummyGuildRoles.find(dgr => dgr.id === payload.id)
    if (guildRoleRes) {
      /* Change default role */
      if (payload.default === true) {
        const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === state.selectedRole.guildId)
        guildRolesRes.forEach(grr => grr.default = false)
      }

      guildRoleRes.name = payload.name
      guildRoleRes.color = payload.color
      guildRoleRes.default = payload.default
    } else {
      throw new Error('no guild role')
    }
  },
  [GuildAdminRoleActionTypes.DELETE_ROLE] (_, payload) {
    const foundIndex = dummyGuildRoles.findIndex(dgr => dgr.id === payload)
    const foundDefaultRole = dummyGuildRoles.find(dgr => dgr.default)
    if (!foundDefaultRole) {
      throw new Error('no default role')
    }
    if (foundIndex >= 0) {
      dummyGuildRoles.splice(foundIndex, 1)
      /* Change all members in the role to default role */
      const usersRes = dummyGuildUsers.filter(dgu => dgu.roleId === payload)
      usersRes.forEach(user => user.roleId = foundDefaultRole.id)
    } else {
      throw new Error('no guild role')
    }
  },
  [GuildAdminRoleActionTypes.CHANGE_MEMBER_ROLE] ({ state }, payload) {
    if (!state.selectedRole.id) {
      throw new Error('no selected role id')
    }
    const userRes = dummyGuildUsers.find(dgu => dgu.userId === payload)
    if (userRes) {
      userRes.roleId = state.selectedRole.id
    } else {
      throw new Error('no user id')
    }
  },
  [GuildAdminRoleActionTypes.ROLE_INDEX_UP] ({ state, rootState }, payload) {
    if (payload.index === state.roleList.length) {
      throw new Error('index is already max')
    }

    const currentRole = dummyGuildRoles.find(role => role.id === payload.id)
    const nextRoleRes = dummyGuildRoles.find(role => role.guildId === rootState.guild.guildInfo.id && role.index === payload.index + 1)
    if (nextRoleRes && currentRole) {
      currentRole.index = currentRole.index + 1
      nextRoleRes.index = nextRoleRes.index - 1
    } else {
      throw new Error('no next or no current role')
    }
  },
  [GuildAdminRoleActionTypes.ROLE_INDEX_DOWN] ({ rootState }, payload) {
    if (payload.index === 0) {
      throw new Error('index is 0')
    }

    const currentRole = dummyGuildRoles.find(role => role.id === payload.id)
    const prevRoleRes = dummyGuildRoles.find(role => role.guildId === rootState.guild.guildInfo.id && role.index === payload.index - 1)
    if (prevRoleRes && currentRole) {
      currentRole.index = currentRole.index - 1
      prevRoleRes.index = prevRoleRes.index + 1
    } else {
      throw new Error('no next or no current role')
    }
  },
}
