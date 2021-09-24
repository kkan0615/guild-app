import { GuildCalendar, GuildCalendarAtAdminCalendar } from '@/types/model/guilds/calendar'
import { GuildUserAtSelectList } from '@/types/model/auth/user/user'
import { MultiselectOption } from '@/utils/libs/multiselect'

export interface GuildAdminCalendarState {
  guildCalendars: Array<GuildCalendar>
  selectedCalendar: GuildCalendarAtAdminCalendar
  userList: Array<MultiselectOption>
}

export const guildAdminCalendarState: GuildAdminCalendarState = {
  guildCalendars: [],
  selectedCalendar: {} as GuildCalendarAtAdminCalendar,
  userList: [],
}
