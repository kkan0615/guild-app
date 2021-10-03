import { FirebaseAttributes } from '@/types/model/attributes'
import { Guild } from '@/types/model/guilds/index'
import { GuildUser } from '@/types/model/auth/user/user'
import { FileAttachment } from '@/types/systems/attachment'

export interface GuildPostBoardGroup extends FirebaseAttributes {
  guildId: string
  name: string
  description?: string
}

export interface GuildPostBoardConfig {
  isAllowComment: boolean
  isPrivate: boolean
  allowUserIds?: Array<string> // If it's private post board
  operatorIds: Array<string> // It should have at least one
}

export interface GuildPostBoard extends FirebaseAttributes {
  guildId: string
  postBoardGroupId: string
  name: string
  description?: string
  isGuild: boolean
  setting: GuildPostBoardConfig
}

export interface GuildPost extends FirebaseAttributes {
  guildId: string
  postBoardId: string
  title: string
  content: string
  isNotice: boolean
  creatorId: string
  attachments?: Array<FileAttachment>
}

export interface GuildPostComment extends FirebaseAttributes {
  guildId: string
  postId: string
  content: string
  creatorId: string
}

export interface GuildPostBoardGroupWithBoards extends GuildPostBoardGroup {
  PostBoards: Array<GuildPostBoard>
}

export interface GuildPostBoardInfo extends GuildPostBoard {
  PostBoardGroup: GuildPostBoardGroup
}

export interface GuildPostInfo extends GuildPost {
  Guild: Guild
  PostBoard: GuildPostBoard
  Comments: Array<GuildPostComment>
  Creator: GuildUser
}
