import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminUserMutations, GuildAdminUserMutationTypes } from '@/store/modules/guilds/admins/User/mutations'
import { GuildAdminUserState } from '@/store/modules/guilds/admins/User/state'
import { dummyGuildJoins } from '@/dummy/guilds/joins'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import { dummyGuildUsers, dummyUsers } from '@/dummy/user'
import {
  GuildUserAtAdminDetail,
  GuildUserAtAdminUserList,
  GuildUserInfo,
  GuildUserSelectListQuery,
  User
} from '@/types/model/auth/user/user'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { GuildRole } from '@/types/model/guilds/role'
import { dummyGuildBlackList } from '@/dummy/guilds/blackList'

export enum GuildAdminUserActionTypes {
  LOAD_USER_LIST = 'guildAdminUser/LOAD_USER_LIST',
  RESET_USER_LIST = 'guildAdminUser/RESET_USER_LIST',
  LOAD_GUILD_JOIN_FORMS = 'guildAdminUser/LOAD_GUILD_JOIN_FORMS',
  RESET_GUILD_JOIN_FORMS = 'guildAdminUser/RESET_GUILD_JOIN_FORMS',
  SET_USER_FILTER_OPTION = 'guildAdminUser/SET_USER_FILTER_OPTION',
  LOAD_BLACK_LIST = 'guildAdminUser/LOAD_BLACK_LIST',
  RESET_BLACK_LIST = 'guildAdminUser/RESET_BLACK_LIST',
  REMOVE_FROM_BLACK_LIST = 'guildAdminUser/REMOVE_FROM_BLACK_LIST',
  LOAD_USER_DETAIL = 'guildAdminUser/LOAD_USER_DETAIL',
  RESET_USER_DETAIL = 'guildAdminUser/RESET_USER_DETAIL',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAdminUserMutations>(
    key: K,
    payload?: Parameters<GuildAdminUserMutations[K]>[1]
  ): ReturnType<GuildAdminUserMutations[K]>
} & Omit<ActionContext<GuildAdminUserState, RootState>, 'commit'>

export interface GuildAdminUserActions {
  /**
   * Load user list
   * @param commit
   * @param rootState
   */
  [GuildAdminUserActionTypes.LOAD_USER_LIST](
    { commit, rootState }: AugmentedActionContext,
  ): void
  /**
   * Reset user list
   * @param commit
   */
  [GuildAdminUserActionTypes.RESET_USER_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS](
    { commit }: AugmentedActionContext,
  ): void
  [GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Set user filter option
   * @param commit
   * @param payload - filter option
   */
  [GuildAdminUserActionTypes.SET_USER_FILTER_OPTION](
    { commit }: AugmentedActionContext,
    payload: GuildUserSelectListQuery,
  ): void

  /**
   * Load black list
   * @param commit
   */
  [GuildAdminUserActionTypes.LOAD_BLACK_LIST](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Reset black list
   * @param commit
   */
  [GuildAdminUserActionTypes.RESET_BLACK_LIST](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Reset black list
   * @param commit
   * @param payload - black id
   */
  [GuildAdminUserActionTypes.REMOVE_FROM_BLACK_LIST](
    { dispatch }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Load user detail for detail page
   * @param commit
   * @param payload - guild user id
   */
  [GuildAdminUserActionTypes.LOAD_USER_DETAIL](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Reset user detail before come out from detail page
   * @param commit
   */
  [GuildAdminUserActionTypes.RESET_USER_DETAIL](
    { dispatch }: AugmentedActionContext,
  ): void
}

export const guildAdminUserActions: ActionTree<GuildAdminUserState, RootState> & GuildAdminUserActions = {
  [GuildAdminUserActionTypes.LOAD_USER_LIST] ({ commit, rootState }) {
    const guildUid = rootState.guild.guildInfo.uid
    if (guildUid) {
      let result: Array<GuildUserAtAdminUserList> = []
      /* Load user list */
      const userListRes = dummyGuildUsers.filter(dgu => rootState.guild.guildInfo.memberIds.includes(dgu.uid))
      result = userListRes.map(user => {
        /* find role */
        const role = dummyGuildRoles.find(dgr => dgr.uid === user.roleId)
        return {
          ...user,
          role: role || {} as GuildRole,
        }
      })
      commit(GuildAdminUserMutationTypes.SET_USER_LIST, result)
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminUserActionTypes.RESET_USER_LIST] ({ commit }) {
    commit(GuildAdminUserMutationTypes.SET_USER_LIST, [])
  },
  [GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS] ({ commit, rootState }) {
    const guildUid = rootState.guild.guildInfo.uid
    if (guildUid) {
      const joinFormsRes = dummyGuildJoins.filter(dgj => dgj.guildId === guildUid)
      const joinForms = joinFormsRes.map(jfr => {
        return {
          ...jfr,
          User: dummyUsers.find(du => du.uid === jfr.userId) || {} as User
        } as GuildJoinInfo
      })
      commit(GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS, joinForms)
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS] ({ commit }) {
    commit(GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS, [])
  },
  [GuildAdminUserActionTypes.SET_USER_FILTER_OPTION] ({ commit }, payload) {
    commit(GuildAdminUserMutationTypes.SET_USER_FILTER_OPTION, payload)
  },
  [GuildAdminUserActionTypes.LOAD_BLACK_LIST] ({ commit, rootState }) {
    const blackListRes = dummyGuildBlackList.filter(dgbl => dgbl.guildId === rootState.guild.guildInfo.uid)
    const result = blackListRes.map(blr => {
      const userRes = dummyUsers.find(du => du.uid === blr.userId)
      return {
        ...blr,
        User: userRes || {} as User,
      }
    })
    commit(GuildAdminUserMutationTypes.SET_BLACK_LIST, result)
  },
  [GuildAdminUserActionTypes.RESET_BLACK_LIST] ({ commit }) {
    commit(GuildAdminUserMutationTypes.SET_BLACK_LIST, [])
  },
  async [GuildAdminUserActionTypes.REMOVE_FROM_BLACK_LIST] ({ dispatch, state }, payload) {
    const foundIndex = dummyGuildBlackList.findIndex(dgbl => dgbl.uid === payload)
    if (foundIndex >= 0) {
      /* Remove at black list */
      dummyGuildBlackList.splice(foundIndex, 1)
      try {
        await dispatch(GuildAdminUserActionTypes.LOAD_BLACK_LIST)
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    } else {
      throw new Error('index is -1')
    }
  },
  [GuildAdminUserActionTypes.LOAD_USER_DETAIL] ({ commit, rootState }, payload) {
    const guildUserRes = dummyGuildUsers.find(dgu => dgu.uid === payload && dgu.guildId === rootState.guild.guildInfo.uid)
    if (guildUserRes) {
      const roleRes = dummyGuildRoles.find(dgr => dgr.uid === guildUserRes.roleId)
      if (roleRes) {
        guildUserRes.role = roleRes
        commit(GuildAdminUserMutationTypes.SET_USER_DETAIL, guildUserRes)
      } else {
        throw new Error('no role')
      }
    } else {
      throw new Error('no guild user')
    }
  },
  [GuildAdminUserActionTypes.RESET_USER_DETAIL] ({ commit }) {
    commit(GuildAdminUserMutationTypes.SET_USER_DETAIL, {} as GuildUserAtAdminDetail)
  },
}
