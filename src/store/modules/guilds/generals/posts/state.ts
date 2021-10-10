import {
  GuildPostBoardGroupWithBoards,
  GuildPostBoardInfo,
  GuildPostInfo, GuildPostInfoAtMain
} from '@/types/model/guilds/post'

export interface GuildPostState {
  isOpenSidebar: boolean
  boardsWithGroups: Array<GuildPostBoardGroupWithBoards>
  currentPostBoardGroup: GuildPostBoardGroupWithBoards
  currentPostBoard: GuildPostBoardInfo
  postListAtMain: Array<GuildPostInfoAtMain>
  recentNewsListAtMain: Array<GuildPostInfoAtMain>
  postListByBoard: Array<GuildPostInfo>
  postNoticeListByBoard: Array<GuildPostInfo>
  recentNewsListByBoard: Array<GuildPostInfo>
  currentPost: GuildPostInfo
}

export const guildPostState: GuildPostState = {
  isOpenSidebar: true,
  boardsWithGroups: [],
  currentPostBoardGroup: {} as GuildPostBoardGroupWithBoards,
  currentPostBoard: {} as GuildPostBoardInfo,
  postListAtMain: [],
  recentNewsListAtMain: [],
  postListByBoard: [],
  postNoticeListByBoard: [],
  recentNewsListByBoard: [],
  currentPost: {} as GuildPostInfo
}
