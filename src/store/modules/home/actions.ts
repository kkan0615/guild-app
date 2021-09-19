import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { HomeMutations, HomeMutationTypes } from '@/store/modules/home/mutations'
import { HomeState } from '@/store/modules/home/state'
import {
  DEFAULT_GUILD_LIST_FILTER_LIMIT,
  GuildCreateForm,
  GuildInfo,
  GuildInfoInList,
  GuildListFilterQuery
} from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import { GuildRole } from '@/types/model/guilds/role'
import { GuildTag } from '@/types/model/guilds/tag'
import * as faker from 'faker'
import { dummyGuildUserPermissions } from '@/dummy/user/guild'
import { dummyGuildUsers } from '@/dummy/user'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { pagenate } from '@/utils/helpers/pagination'

export enum HomeActionTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  RESET_GUILD_LIST_FILTER_OPTION = 'home/RESET_GUILD_LIST_FILTER_OPTION',
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
  [HomeActionTypes.RESET_GUILD_LIST_FILTER_OPTION](
    { commit }: AugmentedActionContext,
    payload: GuildListFilterQuery
  ): void
  [HomeActionTypes.LOAD_GUILD_LIST](
    { commit, state }: AugmentedActionContext,
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
  [HomeActionTypes.RESET_GUILD_LIST_FILTER_OPTION] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION, {
      limit: DEFAULT_GUILD_LIST_FILTER_LIMIT,
    } as GuildListFilterQuery)
  },
  [HomeActionTypes.LOAD_GUILD_LIST] ({ commit, state }) {
    let guildListRes:Array<GuildInfoInList> = dummyGuilds.map(dg => {
      const tagsRes = dummyGuildTags.filter(dgt => dg.tagIds.includes(dgt.uid))
      return {
        uid: dg.uid,
        name: dg.name,
        img: dg.img,
        introduction: dg.introduction,
        memberIds: dg.memberIds,
        tags: tagsRes,
        tagIds: dg.tagIds,
      }
    })

    const totalGuildList = guildListRes.length
    /* set total size of guild list */
    commit(HomeMutationTypes.SET_TOTAL_GUILD_LIST, guildListRes.length)

    /* Name filtering */
    if (state.guildListFilterOption.name) {
      const name = state.guildListFilterOption.name
      guildListRes = guildListRes.filter(guild => (guild.name.toLowerCase()).includes(name ? name.toLowerCase() : ''))
    }
    /* Tag filtering */
    if (state.guildListFilterOption.tags && state.guildListFilterOption.tags.length) {
      guildListRes = guildListRes.filter(guild => guild.tagIds.every(tagId => (state.guildListFilterOption.tags || []).includes(tagId)))
    }

    /* limit offset divider */
    if (state.guildListFilterOption.limit) {
      guildListRes = pagenate(guildListRes, state.guildListFilterOption.limit, state.guildListFilterOption.offset || 0, totalGuildList)
    }

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
    if (guildInfoRes) {
      const guildRolesRes = dummyGuildRoles.filter(dgr => dgr.guildId === guildInfoRes.uid).sort((a, b) => a.index - b.index)
      const tagsRes = dummyGuildTags.filter(dgt => guildInfoRes.tagIds.includes(dgt.uid))
      const members = dummyGuildUsers.filter(dgu => guildInfoRes.memberIds.includes(dgu.uid)).sort((a, b) => a.nickname.localeCompare(b.nickname))
      const mainMember = dummyGuildUsers.find(dgu => dgu.uid === guildInfoRes.mainMangerId)
      console.log('hi', members)
      if (mainMember) {
        commit(HomeMutationTypes.SET_GUILD_INFO, {
          ...guildInfoRes,
          mainManger: mainMember,
          members: members,
          roles: guildRolesRes,
          tags: tagsRes,
        })
      }
    } else {
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
      if (!guildInfoRes.isRequirePermission) {
        guildInfoRes.memberIds.push(rootState.user.uid)
        dummyGuildUsers.push({
          uid: v4(),
          email: rootState.user.email,
          name: rootState.user.name,
          nickname: rootState.user.nickname,
          color: rootState.user.color,
          img: rootState.user.img,
          auth: rootState.user.auth,
          role: {} as GuildRole,
          userId: rootState.user.uid,
          guildId: guildInfoRes.uid,
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
          // roleI: guildInfoRes.roles[0],
        } as GuildUserInfo)
      } else {
        dummyGuildUserPermissions.push({
          uid: v4(),
          userId: rootState.user.uid,
          guildId: guildInfoRes.uid,
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        })
      }
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
      roleId: '',
      role: {} as GuildRole,
      notifications: [],
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildUserInfo

    dummyGuildUsers.push(guildUser)

    // @FOR_TEST
    dummyGuilds.push({
      uid: newGuildUid,
      img: payload.img,
      logoImg: payload.img,
      name: payload.name,
      introduction: payload.introduction,
      description: payload.description,
      mainMangerId: rootState.user.uid,
      tagIds: payload.tagIds,
      roleIds: [],
      memberIds: [rootState.user.uid],
      isRequirePermission: payload.isRequirePermission,
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
