import { MutationTree } from 'vuex'
import { GuildCalendarState } from './state'
import { GuildCalendarAtCalendar } from '@/types/model/guilds/calendar'
import TuiCalendar from 'tui-calendar'
import _ from 'lodash'

export enum GuildCalendarMutationTypes {
  SET_IS_OPEN_SIDEBAR = 'guildCalendar/SET_IS_OPEN_SIDEBAR',
  SET_MY_CALENDAR_LIST = 'guildCalendar/SET_MY_CALENDAR_LIST',
  SET_GUILD_CALENDAR_LIST = 'guildCalendar/SET_GUILD_CALENDAR_LIST',
  SET_OTHER_CALENDAR_LIST = 'guildCalendar/SET_OTHER_CALENDAR_LIST',
  SET_TUI_CALENDAR = 'guildCalendar/SET_TUI_CALENDAR',
}
export type GuildCalendarMutations<S = GuildCalendarState> = {
  [GuildCalendarMutationTypes.SET_IS_OPEN_SIDEBAR](state: S, payload: boolean): void
  [GuildCalendarMutationTypes.SET_MY_CALENDAR_LIST](state: S, payload: Array<GuildCalendarAtCalendar>): void
  [GuildCalendarMutationTypes.SET_GUILD_CALENDAR_LIST](state: S, payload: Array<GuildCalendarAtCalendar>): void
  [GuildCalendarMutationTypes.SET_OTHER_CALENDAR_LIST](state: S, payload: Array<GuildCalendarAtCalendar>): void
  [GuildCalendarMutationTypes.SET_TUI_CALENDAR](state: S, payload: TuiCalendar | null): void
}

export const guildCalendarMutations: MutationTree<GuildCalendarState> & GuildCalendarMutations = {
  [GuildCalendarMutationTypes.SET_IS_OPEN_SIDEBAR] (state, payload) {
    state.isOpenSidebar = payload
  },
  [GuildCalendarMutationTypes.SET_MY_CALENDAR_LIST] (state, payload) {
    state.myCalendarList = _.cloneDeep(payload)
  },
  [GuildCalendarMutationTypes.SET_GUILD_CALENDAR_LIST] (state, payload) {
    state.guildCalendarList = _.cloneDeep(payload)
  },
  [GuildCalendarMutationTypes.SET_OTHER_CALENDAR_LIST] (state, payload) {
    state.otherCalendarList = _.cloneDeep(payload)
  },
  [GuildCalendarMutationTypes.SET_TUI_CALENDAR] (state, payload) {
    state.tuiCalendar = _.cloneDeep(payload)
  },
}
