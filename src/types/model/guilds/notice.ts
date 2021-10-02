import { FirebaseAttributes, SelectListFilterQuery } from '@/types/model/attributes'
import { CustomDate } from '@/types/systems/date'

export interface GuildNotice extends FirebaseAttributes {
  guildId: string
  title: string
  content?: string
  endDate?: CustomDate
}

export type GuildNoticeCreatForm = Pick<GuildNotice, 'title' | 'content' | 'endDate'>
export type GuildNoticeUpdateForm = Pick<GuildNotice, 'id' | 'title' | 'content' | 'endDate'>

export interface GuildNoticeSelectListQuery extends SelectListFilterQuery {
  title: string
}
