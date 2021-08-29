import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildRole } from '@/types/model/guilds/role'
import { Notification } from '@/types/systems/notification'

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
  role: GuildRole
  notifications: Array<Notification>
}

export interface UserLoginForm {
  email: string
  password: string
}
