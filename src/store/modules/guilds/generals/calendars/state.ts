import { GuildCalendarAtCalendar } from '@/types/model/guilds/calendar'

export interface GuildCalendarState {
  isOpenSidebar: boolean
  myCalendarList: Array<GuildCalendarAtCalendar>
  guildCalendarList: Array<GuildCalendarAtCalendar>
  otherCalendarList: Array<GuildCalendarAtCalendar>
}

export const guildCalendarState: GuildCalendarState = {
  isOpenSidebar: true,
  myCalendarList: [],
  guildCalendarList: [],
  otherCalendarList: [],
}
