import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildPostMutations, GuildPostMutationTypes } from './mutations'
import { GuildPostState } from './state'
import {
  GuildPostBoard,
  GuildPostBoardCreateForm,
  GuildPostBoardGroup,
  GuildPostBoardGroupCreateForm,
  GuildPostBoardGroupUpdateForm,
  GuildPostBoardGroupWithBoards,
  GuildPostBoardInfo, GuildPostBoardUpdateForm, GuildPostCreateForm,
  GuildPostInfo,
  GuildPostInfoAtMain, GuildPostUpdateForm
} from '@/types/model/guilds/post'
import { dummyGuildPostBoardGroups, dummyGuildPostBoards, dummyGuildPosts } from '@/dummy/guilds/post'
import { dummyGuildUsers } from '@/dummy/user'
import { GuildUser } from '@/types/model/auth/user/user'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { MultiselectOption } from '@/utils/libs/multiselect'

export enum GuildPostActionTypes {
  OPEN_SIDE_BAR = 'guildPost/OPEN_SIDE_BAR',
  CLOSE_SIDE_BAR = 'guildPost/CLOSE_SIDE_BAR',
  LOAD_BOARDS_WITH_GROUPS = 'guildPost/LOAD_BOARDS_WITH_GROUPS',
  RESET_BOARDS_WITH_GROUPS = 'guildPost/RESET_BOARDS_WITH_GROUPS',
  LOAD_CURRENT_POST_BOARDS_WITH_GROUPS = 'guildPost/LOAD_CURRENT_POST_BOARDS_WITH_GROUPS',
  RESET_CURRENT_POST_BOARDS_WITH_GROUPS = 'guildPost/RESET_CURRENT_POST_BOARDS_WITH_GROUPS',
  CREATE_POST_BOARD_GROUP = 'guildPost/CREATE_POST_BOARD_GROUP',
  UPDATE_POST_BOARD_GROUP = 'guildPost/UPDATE_POST_BOARD_GROUP',
  DELETE_POST_BOARD_GROUP = 'guildPost/DELETE_POST_BOARD_GROUP',
  LOAD_CURRENT_BOARD = 'guildPost/LOAD_CURRENT_BOARD',
  RESET_CURRENT_BOARD = 'guildPost/RESET_CURRENT_BOARD',
  CREATE_POST_BOARD = 'guildPost/CREATE_POST_BOARD',
  UPDATE_POST_BOARD = 'guildPost/UPDATE_POST_BOARD',
  DELETE_POST_BOARD = 'guildPost/DELETE_POST_BOARD',
  LOAD_POST_LIST_AT_MAIN = 'guildPost/LOAD_POST_LIST_AT_MAIN',
  RESET_POST_LIST_AT_MAIN = 'guildPost/RESET_POST_LIST_AT_MAIN',
  LOAD_RECENT_NEWS_LIST_AT_MAIN = 'guildPost/LOAD_RECENT_NEWS_LIST_AT_MAIN',
  RESET_RECENT_NEWS_LIST_AT_MAIN = 'guildPost/RESET_RECENT_NEWS_LIST_AT_MAIN',
  LOAD_POST_LIST_BY_BOARD_ID = 'guildPost/LOAD_POST_LIST_BY_BOARD_ID',
  RESET_POST_LIST_BY_BOARD_ID = 'guildPost/RESET_POST_LIST_BY_BOARD_ID',
  LOAD_POST_NOTICE_LIST_BY_BOARD_ID = 'guildPost/LOAD_POST_NOTICE_LIST_BY_BOARD_ID',
  RESET_POST_NOTICE_LIST_BY_BOARD_ID = 'guildPost/RESET_POST_NOTICE_LIST_BY_BOARD_ID',
  LOAD_RECENT_NEWS_LIST_BY_BOARD = 'guildPost/LOAD_RECENT_NEWS_LIST_BY_BOARD',
  RESET_RECENT_NEWS_LIST_BY_BOARD = 'guildPost/RESET_RECENT_NEWS_LIST_BY_BOARD',
  LOAD_CURRENT_POST = 'guildPost/LOAD_CURRENT_POST',
  RESET_CURRENT_POST = 'guildPost/RESET_CURRENT_POST',
  CREATE_POST = 'guildPost/CREATE_POST',
  UPDATE_POST = 'guildPost/UPDATE_POST',
  DELETE_POST = 'guildPost/DELETE_POST',
  LOAD_USER_LIST = 'guildPost/LOAD_USER_LIST',
  RESET_USER_LIST = 'guildPost/RESET_USER_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildPostMutations>(
    key: K,
    payload?: Parameters<GuildPostMutations[K]>[1]
  ): ReturnType<GuildPostMutations[K]>
} & Omit<ActionContext<GuildPostState, RootState>, 'commit'>

export interface GuildPostActions {
  [GuildPostActionTypes.OPEN_SIDE_BAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.CLOSE_SIDE_BAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_BOARDS_WITH_GROUPS](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.LOAD_CURRENT_POST_BOARDS_WITH_GROUPS](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.RESET_CURRENT_POST_BOARDS_WITH_GROUPS](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.CREATE_POST_BOARD_GROUP](
    { commit }: AugmentedActionContext,
    payload: GuildPostBoardGroupCreateForm
  ): string
  [GuildPostActionTypes.UPDATE_POST_BOARD_GROUP](
    { commit }: AugmentedActionContext,
    payload: GuildPostBoardGroupUpdateForm
  ): void
  [GuildPostActionTypes.DELETE_POST_BOARD_GROUP](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Load current board by board id
   * @param commit
   * @param payload - board id
   */
  [GuildPostActionTypes.LOAD_CURRENT_BOARD](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.RESET_CURRENT_BOARD](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.CREATE_POST_BOARD](
    { commit }: AugmentedActionContext,
    payload: GuildPostBoardCreateForm
  ): string
  [GuildPostActionTypes.UPDATE_POST_BOARD](
    { commit }: AugmentedActionContext,
    payload: GuildPostBoardUpdateForm
  ): void
  [GuildPostActionTypes.DELETE_POST_BOARD](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_POST_LIST_AT_MAIN](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_AT_MAIN](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_RECENT_NEWS_LIST_AT_MAIN](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Load post list by board id
   * @param commit
   * @param payload
   */
  [GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Reset post list by board id
   * @param commit
   */
  [GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Load post list by board id
   * @param commit
   * @param payload
   */
  [GuildPostActionTypes.LOAD_POST_NOTICE_LIST_BY_BOARD_ID](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  /**
   * Reset post list by board id
   * @param commit
   */
  [GuildPostActionTypes.RESET_POST_NOTICE_LIST_BY_BOARD_ID](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_BY_BOARD](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_RECENT_NEWS_LIST_BY_BOARD](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Load current post
   * @param commit
   * @param payload - post id
   */
  [GuildPostActionTypes.LOAD_CURRENT_POST](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.RESET_CURRENT_POST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.CREATE_POST](
    { commit }: AugmentedActionContext,
    payload: GuildPostCreateForm
  ): string
  [GuildPostActionTypes.UPDATE_POST](
    { commit }: AugmentedActionContext,
    payload: GuildPostUpdateForm
  ): void
  [GuildPostActionTypes.DELETE_POST](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.LOAD_USER_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_USER_LIST](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildPostActions: ActionTree<GuildPostState, RootState> & GuildPostActions = {
  [GuildPostActionTypes.OPEN_SIDE_BAR] ({ commit }) {
    commit(GuildPostMutationTypes.SET_IS_OPEN_SIDEBAR, true)
  },
  [GuildPostActionTypes.CLOSE_SIDE_BAR] ({ commit }) {
    commit(GuildPostMutationTypes.SET_IS_OPEN_SIDEBAR, false)
  },
  [GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS] ({ commit, rootState }) {
    const postBoardsWithGroupsRes: Array<GuildPostBoardGroupWithBoards> = dummyGuildPostBoardGroups.filter((postBoardGroup => {
      return postBoardGroup.guildId === rootState.guild.guildInfo.id
      && !postBoardGroup.deletedAt
    })).map(postBoardGroup => {
      return {
        ...postBoardGroup,
        PostBoards: dummyGuildPostBoards.filter(guildPostBoard => guildPostBoard.postBoardGroupId === postBoardGroup.id)
      }
    })

    commit(GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS, postBoardsWithGroupsRes)
  },
  [GuildPostActionTypes.RESET_BOARDS_WITH_GROUPS] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS, [])
  },
  [GuildPostActionTypes.LOAD_CURRENT_POST_BOARDS_WITH_GROUPS] ({ commit, rootState }, payload) {
    const postBoardsWithGroupRes = dummyGuildPostBoardGroups.find(guildPostBoardGroup => guildPostBoardGroup.id === payload)
    if (postBoardsWithGroupRes) {
      const postBoardsWithGroup: GuildPostBoardGroupWithBoards = {
        ...postBoardsWithGroupRes,
        PostBoards: dummyGuildPostBoards.filter(guildPostBoard => guildPostBoard.postBoardGroupId === postBoardsWithGroupRes.id)
      }
      commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD_GROUP, postBoardsWithGroup)
    } else {
      throw new Error('no post board group by id')
    }
  },
  [GuildPostActionTypes.RESET_CURRENT_POST_BOARDS_WITH_GROUPS] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD_GROUP, {} as GuildPostBoardGroupWithBoards)
  },
  [GuildPostActionTypes.CREATE_POST_BOARD_GROUP] ({ rootState }, payload) {
    const newGuildPostBoardGroupId = v4()

    dummyGuildPostBoardGroups.push({
      id: newGuildPostBoardGroupId,
      guildId: rootState.guild.guildInfo.id,
      name: payload.name,
      description: payload.description,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newGuildPostBoardGroupId
  },
  [GuildPostActionTypes.UPDATE_POST_BOARD_GROUP] ({ commit }, payload) {
    const foundPostBoardGroup = dummyGuildPostBoardGroups.find(postBoard => postBoard.id === payload.id)
    if (foundPostBoardGroup) {
      foundPostBoardGroup.name = payload.name
      foundPostBoardGroup.description = payload.description
      foundPostBoardGroup.updatedAt = dayjs().toISOString()
    } else {
      throw new Error('No found post board group by id')
    }
  },
  async [GuildPostActionTypes.DELETE_POST_BOARD_GROUP] ({ dispatch }, payload) {
    const foundPostBoardGroup = dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === payload)
    if (foundPostBoardGroup) {
      foundPostBoardGroup.updatedAt = dayjs().toISOString()
      foundPostBoardGroup.deletedAt = dayjs().toISOString()
      try {
        const postBoardsRes = dummyGuildPostBoards.filter(postBoard => postBoard.postBoardGroupId === foundPostBoardGroup.id)
        for (let i = 0; i < postBoardsRes.length; i++) {
          const postBoardRes = postBoardsRes[i]
          await dispatch(GuildPostActionTypes.DELETE_POST_BOARD, postBoardRes.id)
        }
      } catch (e) {
        console.error(e)
        throw new Error(e)
      }
    } else {
      throw new Error('No found post board group by id')
    }
  },
  [GuildPostActionTypes.LOAD_CURRENT_BOARD] ({ commit }, payload) {
    const postBoardRes = dummyGuildPostBoards.find(post => post.id === payload)
    if (postBoardRes) {
      const result = {
        ...postBoardRes,
        PostBoardGroup: dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === postBoardRes.postBoardGroupId) || {} as GuildPostBoardGroup,
        setting: {
          ...postBoardRes.setting,
          Operators: dummyGuildUsers.filter(guildUser => postBoardRes.setting.operatorIds.includes(guildUser.id))
        }
      } as GuildPostBoardInfo
      commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD, result)
    } else {
      throw new Error('no post board by payload')
    }
  },
  [GuildPostActionTypes.RESET_CURRENT_BOARD] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD, {} as GuildPostBoardInfo)
  },
  [GuildPostActionTypes.CREATE_POST_BOARD] ({ rootState }, payload) {
    const newGuildPostBoardId = v4()

    dummyGuildPostBoards.push({
      id: newGuildPostBoardId,
      guildId: rootState.guild.guildInfo.id,
      name: payload.name,
      description: payload.description,
      postBoardGroupId: payload.postBoardGroupId,
      isGuild: false,
      setting: {
        operatorIds: payload.operatorIds.concat([rootState.guild.guildUserInfo.id]), // Creator should be one of operators
        isPrivate: payload.isPrivate,
        allowUserIds: payload.allowUserIds,
        isAllowComment: payload.isAllowComment,
      },
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newGuildPostBoardId
  },
  [GuildPostActionTypes.UPDATE_POST_BOARD] (context, payload) {
    const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === payload.id)
    if (foundPostBoard) {
      foundPostBoard.name = payload.name
      foundPostBoard.description = payload.description
      foundPostBoard.setting.isAllowComment = payload.isAllowComment
      foundPostBoard.setting.isPrivate = payload.isPrivate
      foundPostBoard.setting.allowUserIds = payload.allowUserIds
      foundPostBoard.setting.operatorIds = payload.operatorIds
      foundPostBoard.updatedAt = dayjs().toISOString()
    } else {
      throw new Error('No found post board by id')
    }
  },
  [GuildPostActionTypes.DELETE_POST_BOARD] (context, payload) {
    const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === payload)
    if (foundPostBoard) {
      foundPostBoard.updatedAt = dayjs().toISOString()
      foundPostBoard.deletedAt = dayjs().toISOString()
    } else {
      throw new Error('No found post board by id')
    }
  },
  [GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN] ({ commit }) {
    const postsRes: Array<GuildPostInfoAtMain> = dummyGuildPosts.reverse().slice(0, 30).map(guildPost => {
      const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === guildPost.postBoardId)
      const postBoardInfo: GuildPostBoardInfo = {
        ...(foundPostBoard || {} as GuildPostBoard),
        PostBoardGroup: dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === foundPostBoard?.postBoardGroupId) || {} as GuildPostBoardGroup,
        setting: {
          ...(foundPostBoard || {} as GuildPostBoard).setting,
          Operators: dummyGuildUsers.filter(guildUser => (foundPostBoard || {} as GuildPostBoard).setting.operatorIds.includes(guildUser.id))
        }
      }
      return {
        ...guildPost,
        Comments: [],
        PostBoard: postBoardInfo,
        Creator: dummyGuildUsers.find(guildUser => guildUser.id === guildPost.creatorId) || {} as GuildUser
      }
    })
    commit(GuildPostMutationTypes.SET_POST_LIST_AT_MAIN, postsRes)
  },
  [GuildPostActionTypes.RESET_POST_LIST_AT_MAIN] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_AT_MAIN] ({ commit }) {
    const postsRes: Array<GuildPostInfoAtMain> = dummyGuildPosts.map(guildPost => {
      const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === guildPost.postBoardId)
      const postBoardInfo: GuildPostBoardInfo = {
        ...(foundPostBoard || {} as GuildPostBoard),
        PostBoardGroup: dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === foundPostBoard?.postBoardGroupId) || {} as GuildPostBoardGroup,
        setting: {
          ...(foundPostBoard || {} as GuildPostBoard).setting,
          Operators: dummyGuildUsers.filter(guildUser => (foundPostBoard || {} as GuildPostBoard).setting.operatorIds.includes(guildUser.id))
        }
      }
      return {
        ...guildPost,
        Comments: [],
        PostBoard: postBoardInfo,
        Creator: dummyGuildUsers.find(guildUser => guildUser.id === guildPost.creatorId) || {} as GuildUser
      }
    }).filter(guildPost => guildPost.isNotice)
    commit(GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN, postsRes)
  },
  [GuildPostActionTypes.RESET_RECENT_NEWS_LIST_AT_MAIN] ({ commit }) {
    commit(GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID] ({ commit }, payload) {
    const postsRes: Array<GuildPostInfoAtMain> = dummyGuildPosts.filter(guildPost =>
      guildPost.postBoardId === payload
        && !guildPost.isNotice
        && !guildPost.deletedAt
    ).map(guildPost => {
      const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === guildPost.postBoardId)
      const postBoardInfo: GuildPostBoardInfo = {
        ...(foundPostBoard || {} as GuildPostBoard),
        PostBoardGroup: dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === foundPostBoard?.postBoardGroupId) || {} as GuildPostBoardGroup,
        setting: {
          ...(foundPostBoard || {} as GuildPostBoard).setting,
          Operators: dummyGuildUsers.filter(guildUser => (foundPostBoard || {} as GuildPostBoard).setting.operatorIds.includes(guildUser.id))
        }
      }
      return {
        ...guildPost,
        Comments: [],
        PostBoard: postBoardInfo,
        Creator: dummyGuildUsers.find(guildUser => guildUser.id === guildPost.creatorId) || {} as GuildUser
      }
    }).reverse()
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, postsRes)
  },
  [GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, [])
  },
  [GuildPostActionTypes.LOAD_POST_NOTICE_LIST_BY_BOARD_ID] ({ commit }, payload) {
    const postsRes: Array<GuildPostInfoAtMain> = dummyGuildPosts.filter(guildPost =>
      guildPost.postBoardId === payload
      && guildPost.isNotice // Get it's notice type
      && !guildPost.deletedAt
    ).map(guildPost => {
      const foundPostBoard = dummyGuildPostBoards.find(postBoard => postBoard.id === guildPost.postBoardId)
      const postBoardInfo: GuildPostBoardInfo = {
        ...(foundPostBoard || {} as GuildPostBoard),
        PostBoardGroup: dummyGuildPostBoardGroups.find(postBoardGroup => postBoardGroup.id === foundPostBoard?.postBoardGroupId) || {} as GuildPostBoardGroup,
        setting: {
          ...(foundPostBoard || {} as GuildPostBoard).setting,
          Operators: dummyGuildUsers.filter(guildUser => (foundPostBoard || {} as GuildPostBoard).setting.operatorIds.includes(guildUser.id))
        }
      }
      return {
        ...guildPost,
        Comments: [],
        PostBoard: postBoardInfo,
        Creator: dummyGuildUsers.find(guildUser => guildUser.id === guildPost.creatorId) || {} as GuildUser
      }
    }).reverse()
    commit(GuildPostMutationTypes.SET_POST_NOTICE_LIST_BY_BOARD, postsRes)
  },
  [GuildPostActionTypes.RESET_POST_NOTICE_LIST_BY_BOARD_ID] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_NOTICE_LIST_BY_BOARD, [])
  },
  [GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_BY_BOARD] ({ commit }) {
    commit(GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.RESET_RECENT_NEWS_LIST_BY_BOARD] ({ commit }) {
    commit(GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.LOAD_CURRENT_POST] ({ commit }, payload) {
    const postRes = dummyGuildPosts.find(post => post.id === payload)
    if (postRes) {
      const result = {
        ...postRes,
        PostBoard: dummyGuildPostBoards.find(postBoardId => postBoardId.id === postRes.postBoardId) || {} as GuildPostBoard,
        Comments: [],
        Creator: dummyGuildUsers.find(guildUser => guildUser.id === postRes.creatorId) || {} as GuildUser
      } as GuildPostInfo
      commit(GuildPostMutationTypes.SET_CURRENT_POST, result)
    } else {
      throw new Error('no post by payload')
    }
  },
  [GuildPostActionTypes.RESET_CURRENT_POST] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST, {} as GuildPostInfo)
  },
  [GuildPostActionTypes.CREATE_POST] ({ rootState }, payload) {
    const newGuildPostId = v4()

    dummyGuildPosts.push({
      id: newGuildPostId,
      guildId: rootState.guild.guildInfo.id,
      title: payload.title,
      content: payload.content,
      postBoardId: payload.postBoardId,
      isNotice: payload.isNotice,
      attachments: [],
      creatorId: rootState.guild.guildUserInfo.id,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newGuildPostId
  },
  [GuildPostActionTypes.UPDATE_POST] (context, payload) {
    const foundPost = dummyGuildPosts.find(postBoard => postBoard.id === payload.id)
    if (foundPost) {
      foundPost.title = payload.title
      foundPost.content = payload.content
      foundPost.isNotice = payload.isNotice
      foundPost.updatedAt = dayjs().toISOString()
    } else {
      throw new Error('No found post board by id')
    }
  },
  [GuildPostActionTypes.DELETE_POST] (context, payload) {
    const foundPost = dummyGuildPosts.find(postBoard => postBoard.id === payload)
    if (foundPost) {
      foundPost.updatedAt = dayjs().toISOString()
      foundPost.deletedAt = dayjs().toISOString()
    } else {
      throw new Error('No found post by id')
    }
  },
  [GuildPostActionTypes.LOAD_USER_LIST] ({ commit, rootState }) {
    const guildUsersRes = dummyGuildUsers
      .filter(guildUser => guildUser.guildId === rootState.guild.guildInfo.id && !guildUser.deletedAt)
      .map(guildUser => {
        return {
          value: guildUser.id,
          label: guildUser.nickname
        } as MultiselectOption
      })
    commit(GuildPostMutationTypes.SET_USER_LIST, guildUsersRes)
  },
  [GuildPostActionTypes.RESET_USER_LIST] ({ commit }) {
    commit(GuildPostMutationTypes.SET_USER_LIST, [])
  },
}
