import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import {
  GuildCalendarMutations,
  GuildCalendarMutationTypes,
} from '@/store/modules/guilds/calendars/mutations'
import { GuildCalendarState } from '@/store/modules/guilds/calendars/state'
import { dummyGuildCalendars } from '@/dummy/guilds/calendar'
import { GuildCalendarAtCalendar } from '@/types/model/guilds/calendar'

export enum GuildCalendarActionTypes {
  OPEN_SIDEBAR = 'guildCalendar/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'guildCalendar/CLOSE_SIDEBAR',
  LOAD_MY_CALENDAR_LIST = 'guildCalendar/LOAD_MY_CALENDAR_LIST',
  RESET_MY_CALENDAR_LIST = 'guildCalendar/RESET_MY_CALENDAR_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildCalendarMutations>(
    key: K,
    payload?: Parameters<GuildCalendarMutations[K]>[1]
  ): ReturnType<GuildCalendarMutations[K]>
} & Omit<ActionContext<GuildCalendarState, RootState>, 'commit'>

export interface GuildCalendarActions {
  [GuildCalendarActionTypes.OPEN_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.CLOSE_SIDEBAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.LOAD_MY_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.RESET_MY_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildCalendarActions: ActionTree<GuildCalendarState, RootState> & GuildCalendarActions = {
  [GuildCalendarActionTypes.OPEN_SIDEBAR] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_IS_OPEN_SIDEBAR, true)
  },
  [GuildCalendarActionTypes.CLOSE_SIDEBAR] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_IS_OPEN_SIDEBAR, false)
  },
  [GuildCalendarActionTypes.LOAD_MY_CALENDAR_LIST] ({ commit, rootState }) {
    const guildCalendarsRes = dummyGuildCalendars
      .filter(guildCalendar =>
        guildCalendar.guildId === 'test-id'
        && guildCalendar.userId === rootState.guild.guildUserInfo.id
        && !guildCalendar.deletedAt
      ).map(guildCalendar => {
        return {
          ...guildCalendar,
          isDisplay: true,
        } as GuildCalendarAtCalendar
      })
    commit(GuildCalendarMutationTypes.SET_MY_CALENDAR_LIST, guildCalendarsRes)
  },
  [GuildCalendarActionTypes.RESET_MY_CALENDAR_LIST] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_MY_CALENDAR_LIST, [])
  },
}
