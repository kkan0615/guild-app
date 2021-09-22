import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildCalendarState } from '@/store/modules/guilds/calendars/state'

export type GuildCalendarGetters<S = GuildCalendarState> = {
  isOpenGuildCalendarSidebar(state: S): boolean
}

export const guildCalendarGetters: GetterTree<GuildCalendarState, RootState> & GuildCalendarGetters = {
  isOpenGuildCalendarSidebar: (state) => state.isOpenSidebar,
}
