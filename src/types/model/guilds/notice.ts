import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { CustomDate } from '@/types/systems/date'

export interface GuildNotice extends FirebaseAttributes {
  guildId: string
  title: string
  color: string
  content?: string
  endDate?: CustomDate
  cols: number // min is 1, max is 12
}

export type GuildNoticeCreatForm = Pick<GuildNotice, 'title' | 'content' | 'color' | 'endDate'>
export type GuildNoticeUpdateForm = Pick<GuildNotice, 'id' | 'title' | 'content' | 'color' | 'endDate'>

export interface GuildNoticeSelectListQuery extends SelectListFilterQuery {
  title: string
}
