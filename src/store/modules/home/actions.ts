import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { HomeMutations, HomeMutationTypes } from '@/store/modules/home/mutations'
import { HomeState } from '@/store/modules/home/state'
import { GuildInfo, GuildInfoInList, GuildListFilterQuery } from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'

export enum HomeActionTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  LOAD_GUILD_LIST = 'home/LOAD_GUILD_LIST',
  RESET_GUILD_LIST = 'home/RESET_GUILD_LIST',
  OPEN_GUILD_LIST_LOADING = 'home/OPEN_GUILD_LIST_LOADING',
  CLOSE_GUILD_LIST_LOADING = 'home/CLOSE_GUILD_LIST_LOADING',
  LOAD_GUILD_INFO = 'home/LOAD_GUILD_INFO',
  RESET_GUILD_INFO = 'home/RESET_GUILD_INFO',
  JOIN_TO_GUILD = 'home/JOIN_TO_GUILD',
}

export type AugmentedActionContext = {
  commit<K extends keyof HomeMutations>(
    key: K,
    payload: Parameters<HomeMutations[K]>[1]
  ): ReturnType<HomeMutations[K]>
} & Omit<ActionContext<HomeState, RootState>, 'commit'>

export interface HomeActions {
  [HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION](
    { commit }: AugmentedActionContext,
    payload: GuildListFilterQuery
  ): void
  [HomeActionTypes.LOAD_GUILD_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.RESET_GUILD_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.OPEN_GUILD_LIST_LOADING](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.CLOSE_GUILD_LIST_LOADING](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.LOAD_GUILD_INFO](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [HomeActionTypes.RESET_GUILD_INFO](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.JOIN_TO_GUILD](
    { commit, rootState }: AugmentedActionContext,
    payload: string
  ): void
}

export const homeActions: ActionTree<HomeState, RootState> & HomeActions = {
  [HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION] ({ commit }, payload) {
    commit(HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION, payload)
  },
  [HomeActionTypes.LOAD_GUILD_LIST] ({ commit }) {
    const guildListRes:Array<GuildInfoInList> = dummyGuilds.map(dg => {
      return {
        uid: dg.uid,
        name: dg.name,
        img: dg.img,
        description: dg.description,
        memberIds: dg.memberIds
      }
    })
    commit(HomeMutationTypes.SET_GUILD_LIST, guildListRes)
  },
  [HomeActionTypes.RESET_GUILD_LIST] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_LIST, [])
  },
  [HomeActionTypes.OPEN_GUILD_LIST_LOADING] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_LIST_LOADING, true)
  },
  [HomeActionTypes.CLOSE_GUILD_LIST_LOADING] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_LIST_LOADING, false)
  },
  [HomeActionTypes.LOAD_GUILD_INFO] ({ commit }, payload) {
    const guildInfoRes = dummyGuilds.find(dg => dg.uid === payload)
    if (guildInfoRes)
      commit(HomeMutationTypes.SET_GUILD_INFO, guildInfoRes)
    else {
      commit(HomeMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
      throw new Error('no data')
    }
  },
  [HomeActionTypes.RESET_GUILD_INFO] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
  },
  [HomeActionTypes.JOIN_TO_GUILD] ({ commit, rootState }, payload: string) {
    const guildInfoRes = dummyGuilds.find(dg => dg.uid === payload)
    if (guildInfoRes) {
      guildInfoRes.memberIds.push(rootState.user.uid)
      guildInfoRes.members.push({
        uid: rootState.user.uid,
        email: rootState.user.email,
        name: rootState.user.name,
        nickname: rootState.user.nickname,
        color: rootState.user.color,
        img: rootState.user.img,
        auth: rootState.user.auth,
        role: guildInfoRes.roles[0],
      } as GuildUserInfo)
    } else {
      throw new Error('no data')
    }
  },
}
