import { FirebaseAttributes } from '@/types/model/attributes'

export interface GuildTag extends FirebaseAttributes {
  name: string
  color: string
}

export type GuildTagCreateForm = Pick<GuildTag, 'name' | 'color'>
