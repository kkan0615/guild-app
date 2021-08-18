import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { User } from '@/types/model/auth/user'
import { GuildTag } from '@/types/model/guilds/tag'

export interface Guild extends FirebaseAttributes {
  img: string
  name: string
  description: string
  tagIds: Array<string>
  mainMangerId: string
}

export interface GuildInfo extends Guild {
  mainManger: User
  tags: Array<GuildTag>
}

export type GuildInDropdown = Pick<Guild, 'uid' | 'img' | 'name'>

export interface GuildListFilterQuery extends SelectListFilterQuery {
  name?: string
  tags?: Array<string>
}
