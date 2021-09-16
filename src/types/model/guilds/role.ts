import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildUser } from '@/types/model/auth/user/user'

export interface GuildRole extends FirebaseAttributes {
  guildId: string
  name: string
  default: boolean
  color?: string
  index: number
}

export interface GuildRoleAtAdmin extends GuildRole {
  Users: Array<GuildUser>
}
