import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { GuildRole } from '@/types/model/guilds/role'
import { Notification } from '@/types/systems/notification'
import { Guild } from '@/types/model/guilds'

export type UserSystemAuth = 'superAdmin' | 'admin' | 'staff'

export interface User extends FirebaseAttributes {
  email: string
  name: string
  nickname: string
  color: string
  img: string
  auth: UserSystemAuth
}

export interface GuildUser extends User {
  guildId: string
  roleId: string
  userId: string
}

export interface GuildUserInfo extends GuildUser {
  role: GuildRole
  notifications: Array<Notification>
}


export type GuildUserAtUserList = Pick<GuildUserInfo, 'uid' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId'>
/**
 * User list
 * Using at admin user page
 */
export type GuildUserAtAdminUserList = Pick<GuildUserInfo, 'uid' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId'>

export type GuildUserAtAdminDetail = Pick<GuildUserInfo, 'uid' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId'>

export interface UserLoginForm {
  email: string
  password: string
}

export interface GuildUserSelectListQuery extends SelectListFilterQuery {
  nickname?: string
}
