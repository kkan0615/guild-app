import { MutationTree } from 'vuex'
import { GuildPostState } from './state'
import _ from 'lodash'
import { GuildPostBoardGroupWithBoards, GuildPostBoardInfo, GuildPostInfo } from '@/types/model/guilds/post'

export enum GuildPostMutationTypes {
  SET_IS_OPEN_SIDEBAR = 'guildPost/SET_IS_OPEN_SIDEBAR',
  SET_POST_BOARDS_WITH_GROUPS = 'guildPost/SET_POST_BOARDS_WITH_GROUPS',
  SET_CURRENT_POST_BOARD = 'guildPost/SET_CURRENT_POST_BOARD',
  SET_POST_LIST_AT_MAIN = 'guildPost/SET_POST_LIST_AT_MAIN',
  SET_RECENT_NEWS_LIST_AT_MAIN = 'guildPost/SET_RECENT_NEWS_LIST_AT_MAIN',
  SET_POST_LIST_BY_BOARD = 'guildPost/SET_POST_LIST_BY_BOARD',
  SET_RECENT_NEWS_LIST_BY_BOARD = 'guildPost/SET_RECENT_NEWS_LIST_AT_MAIN',
  SET_CURRENT_POST = 'guildPost/SET_CURRENT_POST',
}

export type GuildPostMutations<S = GuildPostState> = {
  [GuildPostMutationTypes.SET_IS_OPEN_SIDEBAR](state: S, payload: boolean): void
  [GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS](state: S, payload: Array<GuildPostBoardGroupWithBoards>): void
  [GuildPostMutationTypes.SET_CURRENT_POST_BOARD](state: S, payload: GuildPostBoardInfo): void
  [GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN](state: S, payload: Array<GuildPostInfo>): void
  [GuildPostMutationTypes.SET_POST_LIST_AT_MAIN](state: S, payload: Array<GuildPostInfo>): void
  [GuildPostMutationTypes.SET_POST_LIST_BY_BOARD](state: S, payload: Array<GuildPostInfo>): void
  [GuildPostMutationTypes.SET_RECENT_NEWS_LIST_BY_BOARD](state: S, payload: Array<GuildPostInfo>): void
  [GuildPostMutationTypes.SET_CURRENT_POST](state: S, payload: GuildPostInfo): void
}

export const guildPostMutations: MutationTree<GuildPostState> & GuildPostMutations = {
  [GuildPostMutationTypes.SET_IS_OPEN_SIDEBAR] (state, payload) {
    state.isOpenSidebar = payload
  },
  [GuildPostMutationTypes.SET_POST_BOARDS_WITH_GROUPS] (state, payload) {
    state.boardsWithGroups = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_CURRENT_POST_BOARD] (state, payload) {
    state.currentPostBoard = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_POST_LIST_AT_MAIN] (state, payload) {
    state.postListAtMain = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_RECENT_NEWS_LIST_AT_MAIN] (state, payload) {
    state.postListAtMain = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_POST_LIST_BY_BOARD] (state, payload) {
    state.postListByBoard = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_RECENT_NEWS_LIST_BY_BOARD] (state, payload) {
    state.postListByBoard = _.cloneDeep(payload)
  },
  [GuildPostMutationTypes.SET_CURRENT_POST] (state, payload) {
    state.currentPost = _.cloneDeep(payload)
  },
}
