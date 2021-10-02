import { FirebaseAttributes } from '@/types/model/attributes'
import { Guild } from '@/types/model/guilds/index'

export interface GuildPostBoard extends FirebaseAttributes {
  guildId: string
  name: string
  openAll: boolean
  allowUserIds?: Array<string>
  description?: string
}

export interface GuildPost extends FirebaseAttributes {
  guildId: string
  postBoardId: string
  title: string
  content: string
}

export interface GuildPostComment extends FirebaseAttributes {
  guildId: string
  postId: string
  content: string
  createdId: string
}

export interface GuildPostInfo extends GuildPost {
  Guild: Guild
  PostBoard: GuildPostBoard
  Comments: Array<GuildPostComment>
}
