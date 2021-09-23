import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminCalendarState } from '@/store/modules/guilds/admins/Calendar/state'
import { GuildCalendar } from '@/types/model/guilds/calendar'

export type GuildAdminCalendarGetters<S = GuildAdminCalendarState> = {
  guildCalendarsAtAdmin(state: S): Array<GuildCalendar>
}

export const guildAdminCalendarGetters: GetterTree<GuildAdminCalendarState, RootState> & GuildAdminCalendarGetters = {
  guildCalendarsAtAdmin: (state) => state.guildCalendars,
}
