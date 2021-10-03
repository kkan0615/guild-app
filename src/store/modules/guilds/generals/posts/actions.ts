import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildPostMutations, GuildPostMutationTypes } from './mutations'
import { GuildPostState } from './state'
import { GuildPostBoardInfo, GuildPostInfo } from '@/types/model/guilds/post'

export enum GuildPostActionTypes {
  OPEN_SIDE_BAR = 'guildPost/OPEN_SIDE_BAR',
  CLOSE_SIDE_BAR = 'guildPost/CLOSE_SIDE_BAR',
  LOAD_BOARDS_WITH_GROUPS = 'guildPost/LOAD_BOARDS_WITH_GROUPS',
  RESET_BOARDS_WITH_GROUPS = 'guildPost/RESET_BOARDS_WITH_GROUPS',
  LOAD_CURRENT_BOARD = 'guildPost/LOAD_CURRENT_BOARD',
  RESET_CURRENT_BOARD = 'guildPost/RESET_CURRENT_BOARD',
  LOAD_POST_LIST_AT_MAIN = 'guildPost/LOAD_POST_LIST_AT_MAIN',
  RESET_POST_LIST_AT_MAIN = 'guildPost/RESET_POST_LIST_AT_MAIN',
  LOAD_POST_LIST_BY_BOARD_ID = 'guildPost/LOAD_POST_LIST_BY_BOARD_ID',
  RESET_POST_LIST_BY_BOARD_ID = 'guildPost/RESET_POST_LIST_BY_BOARD_ID',
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

  /**
   * Load post list by board id
   * @param commit
   */
  [GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Reset post list by board id
   * @param commit
   */
  [GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID](
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
  [GuildPostActionTypes.LOAD_BOARDS_WITH_GROUPS] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS, [])
  },
  [GuildPostActionTypes.RESET_BOARDS_WITH_GROUPS] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS, [])
  },
  [GuildPostActionTypes.LOAD_CURRENT_BOARD] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD, {} as GuildPostBoardInfo)
  },
  [GuildPostActionTypes.RESET_CURRENT_BOARD] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST_BOARD, {} as GuildPostBoardInfo)
  },
  [GuildPostActionTypes.LOAD_POST_LIST_AT_MAIN] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.RESET_POST_LIST_AT_MAIN] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_AT_MAIN, [])
  },
  [GuildPostActionTypes.LOAD_POST_LIST_BY_BOARD_ID] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, [])
  },
  [GuildPostActionTypes.RESET_POST_LIST_BY_BOARD_ID] ({ commit }) {
    commit(GuildPostMutationTypes.SET_POST_LIST_BY_BOARD, [])
  },
  [GuildPostActionTypes.LOAD_CURRENT_POST] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST, {} as GuildPostInfo)
  },
  [GuildPostActionTypes.RESET_CURRENT_POST] ({ commit }) {
    commit(GuildPostMutationTypes.SET_CURRENT_POST, {} as GuildPostInfo)
  },
}
