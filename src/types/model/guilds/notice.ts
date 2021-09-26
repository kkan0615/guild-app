import { FirebaseAttributes } from '@/types/model/attributes'
import { CustomDate } from '@/types/systems/date'

export interface GuildNotice extends FirebaseAttributes {
  title: string
  content?: string
  endDate?: CustomDate
}
