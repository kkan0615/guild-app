import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { GuildTag } from '@/types/model/guilds/tag'
import { GuildRole } from '@/types/model/guilds/role'
import { GuildJoinQuestion } from '@/types/model/guilds/question'

export interface Guild extends FirebaseAttributes {
  img: string
  logoImg: string
  name: string
  introduction: string
  description: string
  tagIds: Array<string>
  roleIds: Array<string>
  mainMangerId: string
  memberIds: Array<string> // user ids, but members are guild users
  isRequirePermission: boolean
  joinQuestions?: Array<GuildJoinQuestion> // questions before join
}

export interface GuildInfo extends Guild {
  mainManger: User
  tags: Array<GuildTag>
  members: Array<GuildUserInfo>
  roles: Array<GuildRole>
}

export type GuildInfoInList = Pick<GuildInfo, 'id' | 'name' | 'img' | 'memberIds' | 'tagIds' | 'tags' | 'introduction'>

export type GuildInDropdown = Pick<Guild, 'id' | 'img' | 'name'>

export interface GuildListFilterQuery extends SelectListFilterQuery {
  name?: string
  tags?: Array<string>
  displayCounts?: number
}

export const DEFAULT_GUILD_LIST_FILTER_LIMIT = 16

export type GuildCreateForm = Pick<GuildInfo, 'name' | 'img' | 'logoImg' | 'description' | 'introduction' | 'isRequirePermission' | 'tagIds'>
