import { MutationTree } from 'vuex'
import { GuildAdminCalendarState } from './state'
import _ from 'lodash'
import { GuildCalendar } from '@/types/model/guilds/calendar'

export enum GuildAdminCalendarMutationTypes {
  SET_GUILD_CALENDARS = 'guildAdminCalendar/SET_GUILD_CALENDARS',
  SET_SELECTED_CALENDAR = 'guildAdminCalendar/SET_SELECTED_CALENDAR',
}
export type GuildAdminCalendarMutations<S = GuildAdminCalendarState> = {
  [GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS](state: S, payload: Array<GuildCalendar>): void
  [GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR](state: S, payload: GuildCalendar): void
}

export const guildAdminCalendarMutations: MutationTree<GuildAdminCalendarState> & GuildAdminCalendarMutations = {
  [GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS] (state, payload) {
    state.guildCalendars = _.cloneDeep(payload)
  },
  [GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR] (state, payload) {
    state.selectedCalendar = _.cloneDeep(payload)
  },
}
