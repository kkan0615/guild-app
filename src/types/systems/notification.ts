import { FirebaseAttributes } from '@/types/model/attributes'
import { User } from '@/types/model/auth/user/user'
import { GuildInfo } from '@/types/model/guilds'

export type NotificationType = 'alert' | 'success'  | 'warning' | 'danger' | 'info' | 'system' | string

export interface Notification extends FirebaseAttributes {
  targetUserId: string
  type: NotificationType
  content: string
  title?: string
  sendUserId?: string // If it's from system, it's undefined
  guildId?: string // If it's from system, it's undefined
}

export interface NotificationInfo extends Notification {
  targetUser: User
  guild?: GuildInfo
}
