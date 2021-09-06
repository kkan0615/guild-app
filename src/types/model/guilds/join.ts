import { FirebaseAttributes } from '@/types/model/attributes'
import { GuildJoinQuestion } from '@/types/model/guilds/question'

export interface GuildJoin extends FirebaseAttributes {
  guildId: string
  userId: string
  nickname: string
  guildQuestions: Array<GuildJoinQuestion>
}

export type GuildJoinCreateForm = Pick<GuildJoin, 'guildId' | 'userId' | 'nickname' | 'guildQuestions'>
