import { FirebaseAttributes } from '@/types/model/attributes'

export interface GuildRole extends FirebaseAttributes{
  name: string
  default: boolean
  color?: string
}
