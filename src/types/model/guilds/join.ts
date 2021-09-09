import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildJoinQuestion } from '@/types/model/guilds/question'
import { GuildUserInfo } from '@/types/model/auth/user/user'

export interface GuildJoin extends FirebaseAttributes {
  guildId: string
  userId: string
  nickname: string
  guildQuestions: Array<GuildJoinQuestion>
}

export interface GuildJoinInfo extends GuildJoin {
  User: GuildUserInfo
}

export type GuildJoinCreateForm = Pick<GuildJoin, 'guildId' | 'userId' | 'nickname' | 'guildQuestions'>
