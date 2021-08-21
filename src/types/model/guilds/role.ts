import { FirebaseAttributes } from '@/types/model/attributes'

export interface GuildRole extends FirebaseAttributes{
  name: string
  color?: string
}
