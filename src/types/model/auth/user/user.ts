import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildRole } from '@/types/model/guilds/role'

export type UserSystemAuth = 'superAdmin' | 'admin' | 'staff'

export interface User extends FirebaseAttributes {
  email: string
  name: string
  nickname: string
  color: string
  img: string
  auth: UserSystemAuth
}

export interface GuildUserInfo extends User, FirebaseAttributes {
  userId: string
  guildId: string
  nickname: string // able to set nickname per guild
  role: GuildRole
}

export interface UserLoginForm {
  email: string
  password: string
}
