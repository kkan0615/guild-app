import { GuildCalendar } from '@/types/model/guilds/calendar'

export interface GuildAdminCalendarState {
  guildCalendars: Array<GuildCalendar>
  selectedCalendar: GuildCalendar
}

export const guildAdminCalendarState: GuildAdminCalendarState = {
  guildCalendars: [],
  selectedCalendar: {} as GuildCalendar
}
