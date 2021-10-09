import {
  GuildPostBoardGroupWithBoards,
  GuildPostBoardInfo,
  GuildPostInfo, GuildPostInfoAtMain
} from '@/types/model/guilds/post'

export interface GuildPostState {
  isOpenSidebar: boolean
  boardsWithGroups: Array<GuildPostBoardGroupWithBoards>
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
  currentPostBoard: {} as GuildPostBoardInfo,
  postListAtMain: [],
  recentNewsListAtMain: [],
  postListByBoard: [],
  postNoticeListByBoard: [],
  recentNewsListByBoard: [],
  currentPost: {} as GuildPostInfo
}
