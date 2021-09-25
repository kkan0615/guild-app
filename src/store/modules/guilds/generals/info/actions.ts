import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildInfo } from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildMutations, GuildMutationTypes } from '@/store/modules/guilds/generals/info/mutations'
import { GuildState } from '@/store/modules/guilds/generals/info/state'
import { dummyGuildUsers } from '@/dummy/user'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import { GuildJoinQuestionForm } from '@/types/model/guilds/question'
import { dummyGuildJoins } from '@/dummy/guilds/joins'
import _ from 'lodash'
import { v4 } from 'uuid'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import { dummyGuildBlackList } from '@/dummy/guilds/blackList'
import dayjs from 'dayjs'
import { GuildBlackCreateForm } from '@/types/model/guilds/blackList'
import { GuildUserInfo, GuildUserState } from '@/types/model/auth/user/user'

export enum GuildActionTypes {
  LOAD_GUILD_INFO = 'guild/LOAD_GUILD_INFO',
  RESET_GUILD_INFO = 'guild/RESET_GUILD_INFO',
  UPDATE_GUILD_USER_INFO = 'guild/UPDATE_GUILD_USER_INFO',
  UPDATE_GUILD_USER_STATE = 'guild/UPDATE_GUILD_USER_STATE',
  RESET_GUILD_USER_INFO = 'guild/RESET_GUILD_USER_INFO',
  LOAD_USER_NOTIFICATION_LIST = 'guild/LOAD_USER_NOTIFICATION_LIST',
  RESET_USER_NOTIFICATION_LIST = 'guild/RESET_USER_NOTIFICATION_LIST',
  READ_USER_NOTIFICATION = 'guild/READ_USER_NOTIFICATION',
  OPEN_SIDEBAR = 'guild/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'guild/CLOSE_SIDEBAR',
  UPDATE_GUILD_QUESTIONS = 'guild/UPDATE_GUILD_QUESTIONS',
  ACCEPT_JOIN_TO_GUILD = 'guild/ACCEPT_JOIN_TO_GUILD',
  REJECT_JOIN_TO_GUILD = 'guild/REJECT_JOIN_TO_GUILD',
  BLOCK_JOIN_TO_GUILD = 'guild/BLOCK_JOIN_TO_GUILD',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildMutations>(
    key: K,
    payload: Parameters<GuildMutations[K]>[1]
  ): ReturnType<GuildMutations[K]>
} & Omit<ActionContext<GuildState, RootState>, 'commit'>

export interface GuildActions {
  [GuildActionTypes.LOAD_GUILD_INFO](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildActionTypes.RESET_GUILD_INFO](
    { commit }: AugmentedActionContext,
  ): void
  [GuildActionTypes.UPDATE_GUILD_USER_INFO](
    { commit, rootState }: AugmentedActionContext,
  ): void
  /**
   * Update User state
   * @param commit
   * @param rootState
   * @param payload
   */
  [GuildActionTypes.UPDATE_GUILD_USER_STATE](
    { commit, rootState }: AugmentedActionContext,
    payload: GuildUserState
  ): void
  /**
   * Reset data in store
   * @param commit
   * @param rootState
   */
  [GuildActionTypes.RESET_GUILD_USER_INFO](
    { commit, rootState }: AugmentedActionContext,
  ): void
  /**
   * Load guild user notifications
   * @param commit
   */
  [GuildActionTypes.LOAD_USER_NOTIFICATION_LIST](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Reset guild user notifications
   * @param commit
   */
  [GuildActionTypes.RESET_USER_NOTIFICATION_LIST](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Read notification
   * @param commit
   * @param payload - notification id
   */
  [GuildActionTypes.READ_USER_NOTIFICATION](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildActionTypes.OPEN_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildActionTypes.CLOSE_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Update guild questions
   * @param commit
   * @param payload - list of question form
   */
  [GuildActionTypes.UPDATE_GUILD_QUESTIONS](
    { state, dispatch }: AugmentedActionContext,
    payload: Array<GuildJoinQuestionForm>
  ): void

  /**
   * Accept join
   * @param state
   * @param dispatch
   * @param payload - guild join
   */
  [GuildActionTypes.ACCEPT_JOIN_TO_GUILD](
    { state, dispatch }: AugmentedActionContext,
    payload: GuildJoinInfo
  ): void
  /**
   * Reject join
   * @param state
   * @param dispatch
   * @param payload - guild join
   */
  [GuildActionTypes.REJECT_JOIN_TO_GUILD](
    { state, dispatch }: AugmentedActionContext,
    payload: GuildJoinInfo
  ): void
  /**
   * Block join
   * @param state
   * @param dispatch
   * @param payload - black form
   */
  [GuildActionTypes.BLOCK_JOIN_TO_GUILD](
    { state, dispatch }: AugmentedActionContext,
    payload: GuildBlackCreateForm
  ): void
}

export const guildActions: ActionTree<GuildState, RootState> & GuildActions = {
  [GuildActionTypes.LOAD_GUILD_INFO] ({ commit }, payload) {
    const guildInfoRes = dummyGuilds.find(dg => dg.id === payload)
    if (guildInfoRes) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === guildInfoRes.id).sort((a, b) => a.index - b.index)
      const tagsRes = dummyGuildTags.filter(dgt => guildInfoRes.tagIds.includes(dgt.id))
      const members = dummyGuildUsers
        .filter(dgu => dgu.guildId === guildInfoRes.id && guildInfoRes.memberIds.includes(dgu.id))
        .sort((a, b) => a.nickname.localeCompare(b.nickname))
      const mainMember = dummyGuildUsers.find(dgu => dgu.id === guildInfoRes.mainMangerId)
      if (mainMember) {
        commit(GuildMutationTypes.SET_GUILD_INFO, {
          ...guildInfoRes,
          mainManger: mainMember,
          members: members,
          roles: guildRolesRes,
          tags: tagsRes,
        })
      }
    } else {
      commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
      throw new Error('no data')
    }
  },
  [GuildActionTypes.RESET_GUILD_INFO] ({ commit }) {
    commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
  },
  [GuildActionTypes.UPDATE_GUILD_USER_INFO] ({ commit, rootState }) {
    const guildUserInfo = dummyGuildUsers.find((du) => {
      return du.userId === rootState.user.id && du.guildId === rootState.guild.guildInfo.id
    })

    if (guildUserInfo) {
      /* Offline to online, other state, just keep it */
      if (guildUserInfo.state === 'OFFLINE') {
        guildUserInfo.state = 'ONLINE'
      }

      commit(GuildMutationTypes.SET_GUILD_USER_INFO, guildUserInfo)
      commit(GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST, guildUserInfo.notifications)
    } else
      throw new Error('no data')
  },
  [GuildActionTypes.UPDATE_GUILD_USER_STATE] ({ commit, state }, payload) {
    const guildUserInfo = dummyGuildUsers.find((guildUser) => {
      return guildUser.id === state.guildUserInfo.id
    })

    if (guildUserInfo) {
      guildUserInfo.state = payload
      commit(GuildMutationTypes.SET_GUILD_USER_INFO, guildUserInfo)
    } else {
      throw new Error('no guild user info')
    }
  },
  [GuildActionTypes.RESET_GUILD_USER_INFO] ({ commit, state }) {
    const foundUser = dummyGuildUsers.find(guildUser => guildUser.id === state.guildUserInfo.id)
    if (foundUser) {
      /* Online state => Offline state */
      if (foundUser.state === 'ONLINE') {
        foundUser.state = 'OFFLINE'
      }
      /* Reset */
      commit(GuildMutationTypes.SET_GUILD_USER_INFO, {} as GuildUserInfo)
    } else {
      throw new Error('no found user')
    }
  },
  [GuildActionTypes.LOAD_USER_NOTIFICATION_LIST] ({ commit }) {
    commit(GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST, [])
  },
  [GuildActionTypes.RESET_USER_NOTIFICATION_LIST] ({ commit }) {
    commit(GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST, [])
  },
  [GuildActionTypes.READ_USER_NOTIFICATION] ({ commit }, payload) {
    // @TODO: Add update notification
    // commit(GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST, [])
  },
  [GuildActionTypes.OPEN_SIDEBAR] ({ commit }) {
    commit(GuildMutationTypes.SET_IS_OPEN_SIDEBAR, true)
  },
  [GuildActionTypes.CLOSE_SIDEBAR] ({ commit }) {
    commit(GuildMutationTypes.SET_IS_OPEN_SIDEBAR, false)
  },
  async [GuildActionTypes.UPDATE_GUILD_QUESTIONS] ({ state, dispatch }, payload) {
    try {
      /* Add at dummy */
      const guildInfoRes = dummyGuilds.find(dg => dg.id === state.guildInfo.id)
      if (guildInfoRes) {
        guildInfoRes.joinQuestions = payload.map(gqf => {
          return {
            question: gqf.question,
            index: gqf.index,
          }
        })

        await dispatch(GuildActionTypes.LOAD_GUILD_INFO, state.guildInfo.id)
      }
    } catch (e) {
      console.error(e)
      throw new Error()
    }
  },
  async [GuildActionTypes.ACCEPT_JOIN_TO_GUILD] ({ state, dispatch }, payload) {
    const index = dummyGuildJoins.findIndex(join => join.id === payload.id)
    if (index >= 0) {
      const foundDummyGuild = dummyGuilds.find(dg => dg.id === state.guildInfo.id)
      if (foundDummyGuild) {
        /* Remove from join form */
        dummyGuildJoins.splice(index, 1)
        /* Create guild user */
        const dummyGuildUserId = v4()
        dummyGuildUsers.push({
          ...payload.User,
          id: dummyGuildUserId,
          guildId: state.guildInfo.id,
          nickname: payload.nickname,
        })
        foundDummyGuild.memberIds.push(dummyGuildUserId)

        /* Reload */
        try {
          await dispatch(GuildActionTypes.LOAD_GUILD_INFO, state.guildInfo.id)
        } catch (e) {
          console.error(e)
          throw new Error(e)
        }
      } else {
        throw new Error('no guild')
      }
    } else {
      throw new Error('index is -1')
    }
  },
  async [GuildActionTypes.REJECT_JOIN_TO_GUILD] (_, payload) {
    const index = dummyGuildJoins.findIndex(join => join.id === payload.id)
    if (index >= 0) {
      /* Remove from join form */
      dummyGuildJoins.splice(index, 1)
    } else {
      throw new Error('index is -1')
    }
  },
  async [GuildActionTypes.BLOCK_JOIN_TO_GUILD] ({ state }, payload) {
    const index = dummyGuildJoins.findIndex(join => join.id === payload.guildJoinId)
    if (index >= 0) {
      /* Remove from join form */
      dummyGuildJoins.splice(index, 1)
      /* Create black list */
      dummyGuildBlackList.push({
        id: v4(),
        guildId: state.guildInfo.id,
        userId: payload.userId,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      })
    } else {
      throw new Error('index is -1')
    }
  },
}
