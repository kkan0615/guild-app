import { FirebaseAttributes } from '@/types/model/attributes'
import { User } from '@/types/model/auth/user/user'

/**
 * Used for black list
 */
export interface GuildBlack extends FirebaseAttributes {
  guildId: string
  userId: string
  description?: string // The reason why this user has been blocked
}

export interface GuildBlackInfo extends GuildBlack {
  User: User
}

export type GuildBlackCreateForm = Pick<GuildBlack, 'guildId' | 'userId' | 'description'> & {
  guildJoinId: string
}
