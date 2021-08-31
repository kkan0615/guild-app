import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { GuildInfo } from '@/types/model/guilds'
import { GuildRole } from '@/types/model/guilds/role'

export interface GuildUserPermission extends FirebaseAttributes{
  userId: string
  guildId: string
}

export interface GuildUserPermissionInfo extends GuildUserPermission {
  user: GuildUserInfo
  guild: GuildInfo
  role: GuildRole
}

export type GuildUserPermissionForm = GuildUserPermission & { roleId: string }

