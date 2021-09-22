import { GuildCalendarAtCalendar } from '@/types/model/guilds/calendar'

export interface GuildCalendarState {
  isOpenSidebar: boolean
  myCalendarList: Array<GuildCalendarAtCalendar>
}

export const guildCalendarState: GuildCalendarState = {
  isOpenSidebar: true,
  myCalendarList: [],
}
