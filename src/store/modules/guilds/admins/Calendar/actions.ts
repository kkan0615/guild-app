import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminCalendarMutations, GuildAdminCalendarMutationTypes } from '@/store/modules/guilds/admins/Calendar/mutations'
import { GuildAdminCalendarState } from '@/store/modules/guilds/admins/Calendar/state'
import { dummyGuildCalendars } from '@/dummy/guilds/calendar'
import { GuildCalendar, GuildCalendarCreateForm, GuildCalendarUpdateForm } from '@/types/model/guilds/calendar'
import { v4 } from 'uuid'
import dayjs from 'dayjs'

export enum GuildAdminCalendarActionTypes {
  LOAD_GUILD_CALENDARS = 'guildAdminCalendar/LOAD_GUILD_CALENDARS',
  RESET_GUILD_CALENDARS = 'guildAdminCalendar/RESET_GUILD_CALENDARS',
  LOAD_SELECTED_CALENDAR_BY_ID = 'guildAdminCalendar/SET_SELECTED_CALENDAR',
  RESET_SELECTED_CALENDAR = 'guildAdminCalendar/RESET_SELECTED_CALENDAR',
  CREATE_GUILD_CALENDAR = 'guildAdminCalendar/CREATE_GUILD_CALENDAR',
  UPDATE_GUILD_CALENDAR = 'guildAdminCalendar/UPDATE_GUILD_CALENDAR',
  DELETE_GUILD_CALENDAR = 'guildAdminCalendar/DELETE_GUILD_CALENDAR',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAdminCalendarMutations>(
    key: K,
    payload?: Parameters<GuildAdminCalendarMutations[K]>[1]
  ): ReturnType<GuildAdminCalendarMutations[K]>
} & Omit<ActionContext<GuildAdminCalendarState, RootState>, 'commit'>

export interface GuildAdminAppActions {
  [GuildAdminCalendarActionTypes.LOAD_GUILD_CALENDARS](
    { commit, rootState }: AugmentedActionContext,
  ): void
  [GuildAdminCalendarActionTypes.RESET_GUILD_CALENDARS](
    { commit }: AugmentedActionContext,
  ): void

  /**
   * Set the selected calendar
   * @param commit
   * @param payload - calendar id
   */
  [GuildAdminCalendarActionTypes.LOAD_SELECTED_CALENDAR_BY_ID](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildAdminCalendarActionTypes.RESET_SELECTED_CALENDAR](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Create new guild calendar
   * @param rootState
   * @param payload
   */
  [GuildAdminCalendarActionTypes.CREATE_GUILD_CALENDAR](
    { rootState }: AugmentedActionContext,
    payload: GuildCalendarCreateForm
  ): void
  /**
   * Update guild calendar by id in payload
   * @param rootState
   * @param payload
   */
  [GuildAdminCalendarActionTypes.UPDATE_GUILD_CALENDAR](
    { rootState }: AugmentedActionContext,
    payload: GuildCalendarUpdateForm
  ): void
  /**
   * Delete guild calendar by id
   * @param rootState
   * @param payload
   */
  [GuildAdminCalendarActionTypes.DELETE_GUILD_CALENDAR](
    { rootState }: AugmentedActionContext,
    payload: string
  ): void
}

export const guildAdminCalendarActions: ActionTree<GuildAdminCalendarState, RootState> & GuildAdminAppActions = {
  [GuildAdminCalendarActionTypes.LOAD_GUILD_CALENDARS] ({ commit, rootState }) {
    const guildCalendarsRes = dummyGuildCalendars
      .filter(guildCalendar =>
        guildCalendar.guildId === rootState.guild.guildInfo.id
        && guildCalendar.isGuild
        && !guildCalendar.deletedAt
      )
    commit(GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS, guildCalendarsRes)
  },
  [GuildAdminCalendarActionTypes.RESET_GUILD_CALENDARS] ({ commit }) {
    commit(GuildAdminCalendarMutationTypes.SET_GUILD_CALENDARS, [])
  },
  [GuildAdminCalendarActionTypes.LOAD_SELECTED_CALENDAR_BY_ID] ({ commit }, payload) {
    const guildCalendarRes = dummyGuildCalendars.find(guildCalendar => guildCalendar.id === payload)
    if (guildCalendarRes) {
      commit(GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR, guildCalendarRes)
    } else {
      throw new Error('no found guild calendar by id')
    }
  },
  [GuildAdminCalendarActionTypes.RESET_SELECTED_CALENDAR] ({ commit }) {
    commit(GuildAdminCalendarMutationTypes.SET_SELECTED_CALENDAR, {} as GuildCalendar)
  },
  [GuildAdminCalendarActionTypes.CREATE_GUILD_CALENDAR] ({ rootState }, paylod) {
    const newCalendarId = v4()

    dummyGuildCalendars.push({
      id: newCalendarId,
      name: paylod.name,
      color: paylod.color,
      description: paylod.description,
      guildId: rootState.guild.guildInfo.id,
      isGuild: true,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildCalendar)

    return newCalendarId
  },
  [GuildAdminCalendarActionTypes.UPDATE_GUILD_CALENDAR] (_, paylod) {
    const guildCalenderRes = dummyGuildCalendars.find(guildCalendar => guildCalendar.id === paylod.id)
    if (guildCalenderRes) {
      if (guildCalenderRes.isGuild) {
        guildCalenderRes.name = paylod.name
        guildCalenderRes.color = paylod.name
        guildCalenderRes.description = paylod.description
      } else {
        throw new Error('it not guild calendar')
      }
    } else {
      throw new Error('no found guild calendar by id')
    }
  },
  [GuildAdminCalendarActionTypes.DELETE_GUILD_CALENDAR] (_, paylod) {
    const guildCalenderRes = dummyGuildCalendars.find(guildCalendar => guildCalendar.id === paylod)
    if (guildCalenderRes) {
      if (guildCalenderRes.isGuild) {
        guildCalenderRes.deletedAt = dayjs().toISOString()
      } else {
        throw new Error('it not guild calendar')
      }
    } else {
      throw new Error('no found guild calendar by id')
    }
  },
}
