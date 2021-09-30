import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import {
  GuildCalendarMutations,
  GuildCalendarMutationTypes,
} from '@/store/modules/guilds/generals/calendars/mutations'
import { GuildCalendarState } from '@/store/modules/guilds/generals/calendars/state'
import { dummyGuildCalendars } from '@/dummy/guilds/calendar'
import {
  GuildCalendar,
  GuildCalendarAtCalendar,
  GuildCalendarCreateForm,
  GuildCalendarUpdateForm
} from '@/types/model/guilds/calendar'
import TuiCalendar, { IEventScheduleObject } from 'tui-calendar'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

export enum GuildCalendarActionTypes {
  OPEN_SIDEBAR = 'guildCalendar/OPEN_SIDEBAR',
  CLOSE_SIDEBAR = 'guildCalendar/CLOSE_SIDEBAR',
  LOAD_MY_CALENDAR_LIST = 'guildCalendar/LOAD_MY_CALENDAR_LIST',
  RESET_MY_CALENDAR_LIST = 'guildCalendar/RESET_MY_CALENDAR_LIST',
  LOAD_CALENDAR_CALENDAR_LIST = 'guildCalendar/LOAD_CALENDAR_CALENDAR_LIST',
  RESET_CALENDAR_CALENDAR_LIST = 'guildCalendar/RESET_CALENDAR_CALENDAR_LIST',
  LOAD_OTHER_CALENDAR_LIST = 'guildCalendar/LOAD_OTHER_CALENDAR_LIST',
  RESET_OTHER_CALENDAR_LIST = 'guildCalendar/RESET_OTHER_CALENDAR_LIST',
  SET_TUI_CALENDAR = 'guildCalendar/SET_TUI_CALENDAR',
  RESET_TUI_CALENDAR = 'guildCalendar/RESET_TUI_CALENDAR',
  BEFORE_CREATE_SCHEDULE_AT_TUI_CALENDAR = 'guildCalendar/BEFORE_CREATE_SCHEDULE_AT_TUI_CALENDAR',
  BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR = 'guildCalendar/BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR',
  ON_CLICK_SCHEDULE_AT_TUI_CALENDAR = 'guildCalendar/BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR',
  ON_CLICK_DAY_NAME_AT_TUI_CALENDAR = 'guildCalendar/ON_CLICK_DAY_NAME_AT_TUI_CALENDAR',
  SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR = 'guildCalendar/SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR',
  CREATE_CALENDAR = 'guildCalendar/CREATE_CALENDAR',
  UPDATE_CALENDAR = 'guildCalendar/UPDATE_CALENDAR',
  DELETE_CALENDAR_BY_ID = 'guildCalendar/DELETE_CALENDAR_BY_ID',
  LOAD_TARGET_CALENDAR = 'guildCalendar/LOAD_TARGET_CALENDAR',
  RESET_TARGET_CALENDAR = 'guildCalendar/RESET_TARGET_CALENDAR',
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
  [GuildCalendarActionTypes.LOAD_CALENDAR_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.RESET_CALENDAR_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.LOAD_OTHER_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.RESET_OTHER_CALENDAR_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.SET_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: TuiCalendar
  ): void
  [GuildCalendarActionTypes.RESET_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
  ): void
  [GuildCalendarActionTypes.BEFORE_CREATE_SCHEDULE_AT_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [GuildCalendarActionTypes.BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: IEventScheduleObject,
  ): void
  [GuildCalendarActionTypes.ON_CLICK_SCHEDULE_AT_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: IEventScheduleObject,
  ): void
  [GuildCalendarActionTypes.ON_CLICK_DAY_NAME_AT_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: IEventScheduleObject,
  ): void
  [GuildCalendarActionTypes.SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: any
  ): void
  [GuildCalendarActionTypes.CREATE_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: GuildCalendarCreateForm
  ): void
  [GuildCalendarActionTypes.UPDATE_CALENDAR](
    { commit }: AugmentedActionContext,
    payload: GuildCalendarUpdateForm
  ): void
  [GuildCalendarActionTypes.DELETE_CALENDAR_BY_ID](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildCalendarActionTypes.LOAD_TARGET_CALENDAR] (
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildCalendarActionTypes.RESET_TARGET_CALENDAR] (
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
        guildCalendar.guildId === rootState.guild.guildInfo.id
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
  [GuildCalendarActionTypes.LOAD_CALENDAR_CALENDAR_LIST] ({ commit, rootState }) {
    const guildCalendarsRes = dummyGuildCalendars
      .filter(guildCalendar =>
        guildCalendar.guildId === rootState.guild.guildInfo.id
        && guildCalendar.targets && guildCalendar.targets.indexOf(rootState.guild.guildUserInfo.id) >= 0
        && guildCalendar.isGuild
        && !guildCalendar.deletedAt
      ).map(guildCalendar => {
        return {
          ...guildCalendar,
          isDisplay: true,
        } as GuildCalendarAtCalendar
      })
    commit(GuildCalendarMutationTypes.SET_GUILD_CALENDAR_LIST, guildCalendarsRes)
  },
  [GuildCalendarActionTypes.RESET_CALENDAR_CALENDAR_LIST] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_GUILD_CALENDAR_LIST, [])
  },
  [GuildCalendarActionTypes.LOAD_OTHER_CALENDAR_LIST] ({ commit, rootState }) {
    const guildCalendarsRes = dummyGuildCalendars
      .filter(guildCalendar =>
        guildCalendar.guildId === rootState.guild.guildInfo.id
        && guildCalendar.userId && guildCalendar.userId !== rootState.guild.guildUserInfo.id
        && guildCalendar.targets && guildCalendar.targets.indexOf(rootState.guild.guildUserInfo.id) >= 0
        && !guildCalendar.deletedAt
      ).map(guildCalendar => {
        return {
          ...guildCalendar,
          isDisplay: true,
        } as GuildCalendarAtCalendar
      })
    commit(GuildCalendarMutationTypes.SET_OTHER_CALENDAR_LIST, guildCalendarsRes)
  },
  [GuildCalendarActionTypes.RESET_OTHER_CALENDAR_LIST] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_OTHER_CALENDAR_LIST, [])
  },
  [GuildCalendarActionTypes.SET_TUI_CALENDAR] ({ commit }, payload) {
    commit(GuildCalendarMutationTypes.SET_TUI_CALENDAR, payload)
  },
  [GuildCalendarActionTypes.RESET_TUI_CALENDAR] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_TUI_CALENDAR, null)
  },
  [GuildCalendarActionTypes.BEFORE_CREATE_SCHEDULE_AT_TUI_CALENDAR] ({ commit }) {
    console.log('test')
  },
  [GuildCalendarActionTypes.BEFORE_UPDATE_SCHEDULE_AT_TUI_CALENDAR] ({ commit }) {
    console.log('test')
  },
  [GuildCalendarActionTypes.ON_CLICK_SCHEDULE_AT_TUI_CALENDAR] ({ commit }) {
    console.log('test')
  },
  [GuildCalendarActionTypes.ON_CLICK_DAY_NAME_AT_TUI_CALENDAR] ({ commit }) {
    console.log('test')
  },
  [GuildCalendarActionTypes.SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR] ({ commit }, payload) {
    commit(GuildCalendarMutationTypes.SET_PREV_CLICKED_CELL_AT_TUI_CALENDAR, payload)
  },
  [GuildCalendarActionTypes.CREATE_CALENDAR] ({ rootState }, payload) {
    const newCalendarId = v4()

    dummyGuildCalendars.push({
      id: newCalendarId,
      guildId: rootState.guild.guildInfo.id,
      name: payload.name,
      color: payload.color,
      description: payload.description,
      userId: rootState.guild.guildUserInfo.id,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildCalendar)

    return newCalendarId
  },
  [GuildCalendarActionTypes.UPDATE_CALENDAR] (_, payload) {
    const calendarRes = dummyGuildCalendars.find(calendar => calendar.id === payload.id)
    console.log('tst!', calendarRes, payload)
    if (calendarRes) {
      calendarRes.name = payload.name
      calendarRes.color = payload.color
      calendarRes.description = payload.description
      calendarRes.updatedAt = dayjs().toISOString()
    } else {
      throw new Error('no calendar by id')
    }
  },
  [GuildCalendarActionTypes.DELETE_CALENDAR_BY_ID] (_, payload) {
    const calendarRes = dummyGuildCalendars.find(calendar => calendar.id === payload)
    if (calendarRes) {
      calendarRes.deletedAt = dayjs().toISOString()
    } else {
      throw new Error('no calendar by id')
    }
  },
  [GuildCalendarActionTypes.LOAD_TARGET_CALENDAR] ({ commit }, payload) {
    const calendarRes = dummyGuildCalendars.find(calendar => calendar.id === payload)
    if (calendarRes) {
      commit(GuildCalendarMutationTypes.SET_TARGET_CALENDAR, calendarRes)
    } else {
      throw new Error('no calendar by id')
    }
  },
  [GuildCalendarActionTypes.RESET_TARGET_CALENDAR] ({ commit }) {
    commit(GuildCalendarMutationTypes.SET_TARGET_CALENDAR, {} as GuildCalendar)
  },
}
