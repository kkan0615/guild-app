import { FirebaseAttributes } from '@/types/model/attributes'

export interface GuildRole extends FirebaseAttributes{
  guildId: string
  name: string
  default: boolean
  color?: string
}
