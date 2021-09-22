import { FirebaseAttributes } from '@/types/model/attributes'
import { CustomDate } from '@/types/systems/date'

export interface GuildCalendar extends FirebaseAttributes {
  guildId: string
  name: string
  color: string
  description?: string
  isGuild?: boolean // Is it created by guild
  userId?: string // created by user
  isShare?: boolean // share this calendar
}

export interface GuildCalendarTask extends FirebaseAttributes {
  guildCalendarId: string
  name: string
  color: string
  content: string
  startDate: CustomDate
  endDate: CustomDate
  isRepeat?: boolean
  repeatDays?: Array<number> // 0 to 6 start from sunday
}

export interface GuildCalendarAtCalendar extends GuildCalendar {
  isDisplay: boolean // display or not
}

/**
 * CalendarId - list of tasks by date to date
 */
export type GuildCalendarTasksByCalendarId = Record<string, Array<GuildCalendarTask>>
