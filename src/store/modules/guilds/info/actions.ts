import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildInfo } from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildMutations, GuildMutationTypes } from '@/store/modules/guilds/info/mutations'
import { GuildState } from '@/store/modules/guilds/info/state'
import { dummyGuildUsers } from '@/dummy/user'

export enum GuildActionTypes {
  LOAD_GUILD_INFO = 'guild/LOAD_GUILD_INFO',
  RESET_GUILD_INFO = 'guild/RESET_GUILD_INFO',
  UPDATE_GUILD_USER_INFO = 'guild/UPDATE_GUILD_USER_INFO',
  LOAD_USER_NOTIFICATION_LIST = 'guild/LOAD_USER_NOTIFICATION_LIST',
  RESET_USER_NOTIFICATION_LIST = 'guild/RESET_USER_NOTIFICATION_LIST',
  READ_USER_NOTIFICATION = 'guild/READ_USER_NOTIFICATION',
  OPEN_SIDEBAR = 'guild/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'guild/CLOSE_SIDEBAR',
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
}

export const guildActions: ActionTree<GuildState, RootState> & GuildActions = {
  [GuildActionTypes.LOAD_GUILD_INFO] ({ commit }, payload) {
    const guildInfoRes = dummyGuilds.find(dg => dg.uid === payload)
    if (guildInfoRes)
      commit(GuildMutationTypes.SET_GUILD_INFO, guildInfoRes)
    else {
      commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
      throw new Error('no data')
    }
  },
  [GuildActionTypes.RESET_GUILD_INFO] ({ commit }) {
    commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
  },
  [GuildActionTypes.UPDATE_GUILD_USER_INFO] ({ commit, rootState }) {
    const guildUserInfo = dummyGuildUsers.find((du) => {
      return du.userId === rootState.user.uid
    })

    if (guildUserInfo) {
      commit(GuildMutationTypes.SET_GUILD_USER_INFO, guildUserInfo)
      commit(GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST, guildUserInfo.notifications)
    } else
      throw new Error('no data')
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
}
