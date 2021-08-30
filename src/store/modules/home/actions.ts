import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { HomeMutations, HomeMutationTypes } from '@/store/modules/home/mutations'
import { HomeState } from '@/store/modules/home/state'
import { GuildCreateForm, GuildInfo, GuildInfoInList, GuildListFilterQuery } from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import { GuildRole } from '@/types/model/guilds/role'
import { GuildTag } from '@/types/model/guilds/tag'
import * as faker from 'faker'

export enum HomeActionTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  LOAD_GUILD_LIST = 'home/LOAD_GUILD_LIST',
  RESET_GUILD_LIST = 'home/RESET_GUILD_LIST',
  OPEN_GUILD_LIST_LOADING = 'home/OPEN_GUILD_LIST_LOADING',
  CLOSE_GUILD_LIST_LOADING = 'home/CLOSE_GUILD_LIST_LOADING',
  LOAD_GUILD_INFO = 'home/LOAD_GUILD_INFO',
  RESET_GUILD_INFO = 'home/RESET_GUILD_INFO',
  JOIN_TO_GUILD = 'home/JOIN_TO_GUILD',
  CREATE_GUILD_INFO = 'home/CREATE_GUILD_INFO',
  CREATE_GUILD_TAGS = 'home/CREATE_GUILD_TAGS',
  CREATE_GUILD_IMAGE = 'home/CREATE_GUILD_IMAGE',
  UPDATE_GUILD_INFO = 'home/UPDATE_GUILD_INFO',
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
  [HomeActionTypes.CREATE_GUILD_INFO](
    { commit, rootState }: AugmentedActionContext,
    payload: GuildCreateForm
  ): string
  [HomeActionTypes.CREATE_GUILD_TAGS](
    { commit, rootState }: AugmentedActionContext,
    payload: Array<GuildTag>
  ): Array<string>
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
        memberIds: dg.memberIds,
        tags: dg.tags,
        tagIds: dg.tagIds,
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
  [HomeActionTypes.CREATE_GUILD_INFO] ({ rootState }, payload) {
    // @FOR_TEST
    const newGuildUid = v4()

    // @FOR_TEST
    const guildUser = {
      uid: v4(),
      guildId: newGuildUid,
      userId: rootState.user.uid,
      email: rootState.user.email,
      name: rootState.user.name,
      nickname: rootState.user.nickname,
      color: rootState.user.color,
      img: rootState.user.img,
      auth: rootState.user.auth,
      role: {} as GuildRole,
      notifications: [],
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildUserInfo

    // @FOR_TEST
    dummyGuilds.push({
      uid: newGuildUid,
      img: payload.img,
      logoImg: payload.img,
      name: payload.name,
      description: payload.description,
      mainMangerId: rootState.user.uid,
      mainManger: rootState.user,
      tagIds: payload.tagIds,
      tags: dummyGuildTags.filter(tag => payload.tagIds.includes(tag.uid)),
      roles: [],
      memberIds: [rootState.user.uid],
      members: [guildUser],
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newGuildUid
  },
  [HomeActionTypes.CREATE_GUILD_TAGS] ({ commit }, payload) {
    const result: Array<string> = []
    for (let i = 0; i < payload.length; i++) {
      const tag = payload[i]
      const newTagUid = v4()
      dummyGuildTags.push({
        uid: newTagUid,
        name: tag.name,
        color: faker.commerce.color(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      })
    }

    return result
  }
}
