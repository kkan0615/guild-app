import {
  GuildPostBoardGroupWithBoards,
  GuildPostBoardInfo,
  GuildPostInfo
} from '@/types/model/guilds/post'

export interface GuildPostState {
  isOpenSidebar: boolean
  boardsWithGroups: Array<GuildPostBoardGroupWithBoards>
  currentPostBoard: GuildPostBoardInfo
  postListAtMain: Array<GuildPostInfo>
  recentNewsListAtMain: Array<GuildPostInfo>
  postListByBoard: Array<GuildPostInfo>
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
  recentNewsListByBoard: [],
  currentPost: {} as GuildPostInfo
}
