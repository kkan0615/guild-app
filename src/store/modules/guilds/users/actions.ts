import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { dummyGuildUsers } from '@/dummy/user'
import {
  GuildUserAtUserList,
  GuildUserSelectListQuery,
} from '@/types/model/auth/user/user'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { GuildRole } from '@/types/model/guilds/role'
import { GuildUserMutations, GuildUserMutationTypes } from '@/store/modules/guilds/users/mutations'
import { GuildUserState } from '@/store/modules/guilds/users/state'
import { pagenate } from '@/utils/helpers/pagination'

export enum GuildUserActionTypes {
  LOAD_USER_LIST = 'guildUser/LOAD_USER_LIST',
  RESET_USER_LIST = 'guildUser/RESET_USER_LIST',
  SET_USER_FILTER_OPTION = 'guildUser/SET_USER_FILTER_OPTION',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildUserMutations>(
    key: K,
    payload?: Parameters<GuildUserMutations[K]>[1]
  ): ReturnType<GuildUserMutations[K]>
} & Omit<ActionContext<GuildUserState, RootState>, 'commit'>

export interface GuildUserActions {
  /**
   * Load user list
   * @param commit
   * @param rootState
   */
  [GuildUserActionTypes.LOAD_USER_LIST](
    { commit, rootState }: AugmentedActionContext,
  ): void
  /**
   * Reset user list
   * @param commit
   */
  [GuildUserActionTypes.RESET_USER_LIST](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Set user filter option
   * @param commit
   * @param payload - filter option
   */
  [GuildUserActionTypes.SET_USER_FILTER_OPTION](
    { commit }: AugmentedActionContext,
    payload: GuildUserSelectListQuery,
  ): void
}

export const guildUserActions: ActionTree<GuildUserState, RootState> & GuildUserActions = {
  [GuildUserActionTypes.LOAD_USER_LIST] ({ commit, state, rootState }) {
    const guildId = rootState.guild.guildInfo.id
    if (guildId) {
      let result: Array<GuildUserAtUserList> = []
      /* Load user list */
      let userListRes = dummyGuildUsers.filter(dgu => rootState.guild.guildInfo.memberIds.includes(dgu.id))
      /* Set total user list */
      const totalUserList = userListRes.length
      commit(GuildUserMutationTypes.SET_TOTAL_USER_LIST, totalUserList)

      /* nickname filtering */
      if (state.userFilterOption.nickname) {
        const nickname = state.userFilterOption.nickname
        userListRes = userListRes.filter(user => (user.nickname.toLowerCase()).includes(nickname ? nickname.toLowerCase() : ''))
      }

      // /* limit offset divider */
      // if (state.userFilterOption.limit) {
      //   userListRes = pagenate(userListRes, state.userFilterOption.limit, state.userFilterOption.offset || 0, totalUserList)
      // }

      result = userListRes.map(user => {
        /* find role */
        const role = dummyGuildRoles.find(dgr => dgr.id === user.roleId)
        return {
          ...user,
          role: role || {} as GuildRole,
        }
      })
      commit(GuildUserMutationTypes.SET_USER_LIST, result)
    } else {
      throw new Error('no guild id')
    }
  },
  [GuildUserActionTypes.RESET_USER_LIST] ({ commit }) {
    commit(GuildUserMutationTypes.SET_USER_LIST, [])
  },
  [GuildUserActionTypes.SET_USER_FILTER_OPTION] ({ commit }, payload) {
    commit(GuildUserMutationTypes.SET_USER_FILTER_OPTION, payload)
  },
}
