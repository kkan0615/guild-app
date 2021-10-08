import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildPostMutations, GuildPostMutationTypes } from './mutations'
import { GuildPostState } from './state'
import {
  GuildPostBoard, GuildPostBoardGroup,
  GuildPostBoardGroupWithBoards,
  GuildPostBoardInfo,
  GuildPostInfo, GuildPostInfoAtMain
} from '@/types/model/guilds/post'
import { dummyGuildPostBoardGroups, dummyGuildPostBoards, dummyGuildPosts } from '@/dummy/guilds/post'
import { dummyGuildUsers } from '@/dummy/user'
import { GuildUser } from '@/types/model/auth/user/user'
import dayjs from 'dayjs'

export enum GuildPostActionTypes {
  OPEN_SIDE_BAR = 'guildPost/OPEN_SIDE_BAR',
  CLOSE_SIDE_BAR = 'guildPost/CLOSE_SIDE_BAR',
  LOAD_BOARDS_WITH_GROUPS = 'guildPost/LOAD_BOARDS_WITH_GROUPS',
  RESET_BOARDS_WITH_GROUPS = 'guildPost/RESET_BOARDS_WITH_GROUPS',
  LOAD_CURRENT_BOARD = 'guildPost/LOAD_CURRENT_BOARD',
  RESET_CURRENT_BOARD = 'guildPost/RESET_CURRENT_BOARD',
  LOAD_POST_LIST_AT_MAIN = 'guildPost/LOAD_POST_LIST_AT_MAIN',
  RESET_POST_LIST_AT_MAIN = 'guildPost/RESET_POST_LIST_AT_MAIN',
  LOAD_RECENT_NEWS_LIST_AT_MAIN = 'guildPost/LOAD_RECENT_NEWS_LIST_AT_MAIN',
  RESET_RECENT_NEWS_LIST_AT_MAIN = 'guildPost/RESET_RECENT_NEWS_LIST_AT_MAIN',
  LOAD_POST_LIST_BY_BOARD_ID = 'guildPost/LOAD_POST_LIST_BY_BOARD_ID',
  RESET_POST_LIST_BY_BOARD_ID = 'guildPost/RESET_POST_LIST_BY_BOARD_ID',
  LOAD_RECENT_NEWS_LIST_BY_BOARD = 'guildPost/LOAD_RECENT_NEWS_LIST_BY_BOARD',
  RESET_RECENT_NEWS_LIST_BY_BOARD = 'guildPost/RESET_RECENT_NEWS_LIST_BY_BOARD',
  LOAD_CURRENT_POST = 'guildPost/LOAD_CURRENT_POST',
  RESET_CURRENT_POST = 'guildPost/RESET_CURRENT_POST',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildPostMutations>(
    key: K,
    payload: Parameters<GuildPostMutations[K]>[1]
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
  [GuildPostActionTypes.LOAD_RECENT_NEWS_LIST_BY_BOARD](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.RESET_RECENT_NEWS_LIST_BY_BOARD](
    { commit }: AugmentedActionContext,
  ): void
  [GuildPostActionTypes.LOAD_CURRENT_POST](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildPostActionTypes.RESET_CURRENT_POST](
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
  [GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN] ({ commit }) {
    const postsRes: Array<GuildPostInfoAtMain> = dummyGuildPosts.slice(0, 30).map(guildPost => {
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
    })
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, postsRes)
  },
  [GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, [])
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
}
