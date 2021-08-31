import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { GuildTag } from '@/types/model/guilds/tag'
import { GuildRole } from '@/types/model/guilds/role'

export interface Guild extends FirebaseAttributes {
  img: string
  logoImg: string
  name: string
  introduction: string
  description: string
  tagIds: Array<string>
  roleIds: Array<string>
  mainMangerId: string
  memberIds: Array<string> // member uids
  isRequirePermission: boolean
  joinQuestions?: Array<string> // questions before join
}

export interface GuildInfo extends Guild {
  mainManger: User
  tags: Array<GuildTag>
  members: Array<GuildUserInfo>
  roles: Array<GuildRole>
}

export type GuildInfoInList = Pick<GuildInfo, 'uid' | 'name' | 'img' | 'memberIds' | 'tagIds' | 'tags' | 'introduction'>

export type GuildInDropdown = Pick<Guild, 'uid' | 'img' | 'name'>

export interface GuildListFilterQuery extends SelectListFilterQuery {
  name?: string
  tags?: Array<string>
}

export type GuildCreateForm = Pick<GuildInfo, 'name' | 'img' | 'logoImg' | 'description' | 'introduction' | 'isRequirePermission' | 'tagIds'>
