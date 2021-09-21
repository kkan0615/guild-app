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

/* @TODO: Guild user 관련 내용 모두 옮기기 */

/**
 * ONLINE - Online, 온라인
 * IDLE - Idle, 자리 비움
 * DO_NOT_DISTURB - Do not disturb, 방해금지 모드
 * INVISIBLE - invisible, offline 처럼 변경
 * OFFLINE - offline, 실제 오프라인
 */
export type GuildUserState = 'ONLINE' | 'IDLE' | 'DO_NOT_DISTURB' | 'INVISIBLE' | 'OFFLINE'

/**
 * Remark - for guild manager
 */
export interface GuildUser extends User {
  guildId: string
  roleId: string
  userId: string
  description?: string
  remark?: string
  state: GuildUserState
}

export interface GuildUserInfo extends GuildUser {
  role: GuildRole
  notifications: Array<Notification>
}

export type GuildUserAtUserList = Pick<GuildUserInfo, 'id' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId' | 'description' | 'remark' | 'state'>
/**
 * User list
 * Using at admin user page
 */
export type GuildUserAtAdminUserList = Pick<GuildUserInfo, 'id' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId' | 'description' | 'remark'>

export type GuildUserAtAdminDetail = Pick<GuildUserInfo, 'id' | 'email' | 'nickname' | 'color' | 'img' | 'auth' | 'role' | 'roleId' | 'description' | 'remark'>

export interface UserLoginForm {
  email: string
  password: string
}

export const DEFAULT_USER_SELECT_LIST_QUERY_LIMIT = 30

export interface GuildUserSelectListQuery extends SelectListFilterQuery {
  nickname?: string
}
