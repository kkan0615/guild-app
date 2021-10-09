import { MutationTree } from 'vuex'
import { GuildAdminCalendarState } from './state'
import _ from 'lodash'
import { GuildCalendar, GuildCalendarAtAdminCalendar } from '@/types/model/guilds/calendar'
import { MultiselectOption } from '@/utils/libs/multiselect'

export enum GuildAdminCalendarMutationTypes {
  SET_GUILD_CALENDARS = 'guildAdminCalendar/SET_GUILD_CALENDARS',
  SET_SELECTED_CALENDAR = 'guildAdminCalendar/SET_SELECTED_CALENDAR',
  SET_USER_LIST = 'guildAdminCalendar/SET_USER_LIST',
}
export type GuildAdminCalendarMutations<S = GuildAdminCalendarState> = {
  [GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS](state: S, payload: Array<GuildCalendar>): void
  [GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR](state: S, payload: GuildCalendarAtAdminCalendar): void
  [GuildAdminCalendarMutationTypes.SET_USER_LIST](state: S, payload: Array<MultiselectOption>): void
}

export const guildAdminCalendarMutations: MutationTree<GuildAdminCalendarState> & GuildAdminCalendarMutations = {
  [GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS] (state, payload) {
    state.guildCalendars = _.cloneDeep(payload)
  },
  [GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR] (state, payload) {
    state.selectedCalendar = payload
  },
  [GuildAdminCalendarMutationTypes.SET_USER_LIST] (state, payload) {
    state.userList = _.cloneDeep(payload)
  },
}
