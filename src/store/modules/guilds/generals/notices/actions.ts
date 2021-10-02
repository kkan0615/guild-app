import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildNoticeMutations, GuildNoticeMutationTypes } from '@/store/modules/guilds/generals/notices/mutations'
import { GuildNoticeState } from '@/store/modules/guilds/generals/notices/state'
import { GuildNoticeCreatForm, GuildNoticeUpdateForm } from '@/types/model/guilds/notice'
import { dummyGuildNotices } from '@/dummy/guilds/notice'
import { v4 } from 'uuid'
import dayjs from 'dayjs'


export enum GuildNoticeActionTypes {
  LOAD_NOTICE_LIST = 'guildNotice/LOAD_NOTICE_LIST',
  RESET_NOTICE_LIST = 'guildNotice/RESET_NOTICE_LIST',
  CREATE_NOTICE = 'guildNotice/CREATE_NOTICE',
  UPDATE_NOTICE = 'guildNotice/UPDATE_NOTICE',
  DELETE_NOTICE = 'guildNotice/DELETE_NOTICE',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildNoticeMutations>(
    key: K,
    payload: Parameters<GuildNoticeMutations[K]>[1]
  ): ReturnType<GuildNoticeMutations[K]>
} & Omit<ActionContext<GuildNoticeState, RootState>, 'commit'>

export interface GuildNoticeActions {
  [GuildNoticeActionTypes.LOAD_NOTICE_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildNoticeActionTypes.RESET_NOTICE_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [GuildNoticeActionTypes.CREATE_NOTICE](
    { commit }: AugmentedActionContext,
    paylad: GuildNoticeCreatForm
  ): void
  [GuildNoticeActionTypes.UPDATE_NOTICE](
    { commit }: AugmentedActionContext,
    paylad: GuildNoticeUpdateForm
  ): void
  [GuildNoticeActionTypes.DELETE_NOTICE](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
}

export const guildNoticeActions: ActionTree<GuildNoticeState, RootState> & GuildNoticeActions = {
  [GuildNoticeActionTypes.LOAD_NOTICE_LIST] ({ commit, rootState }) {
    const guildNoticesRes = dummyGuildNotices.filter(guildNotice =>
      guildNotice.guildId === rootState.guild.guildInfo.id
      && (!guildNotice.endDate || dayjs(guildNotice.endDate).isAfter(dayjs()) || dayjs(guildNotice.endDate).isSame(dayjs()))
      && !guildNotice.deletedAt).sort((a, b) => {
      if (!a.endDate || b.endDate) {
        return -1
      }
      return dayjs(a.endDate).diff(b.endDate)
    })
    commit(GuildNoticeMutationTypes.SET_NOTICE_LIST, guildNoticesRes)
  },
  [GuildNoticeActionTypes.RESET_NOTICE_LIST] ({ commit }) {
    commit(GuildNoticeMutationTypes.SET_NOTICE_LIST, [])
  },
  [GuildNoticeActionTypes.CREATE_NOTICE] ({ rootState }, payload) {
    const newGuildNoticeId = v4()

    dummyGuildNotices.push({
      id: newGuildNoticeId,
      guildId: rootState.guild.guildInfo.id,
      color: payload.color,
      title: payload.title,
      content: payload.content,
      endDate: payload.endDate ? dayjs(payload.endDate).toISOString() : undefined,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    return newGuildNoticeId
  },
  [GuildNoticeActionTypes.UPDATE_NOTICE] (_, payload) {
    const guildNoticeRes = dummyGuildNotices.find(guildNotice => guildNotice.id === payload.id)
    if (guildNoticeRes) {
      console.log(payload)
      guildNoticeRes.title = payload.title
      guildNoticeRes.content = payload.content
      guildNoticeRes.color = payload.color
      guildNoticeRes.endDate = payload.endDate ? dayjs(payload.endDate).toISOString() : undefined
      guildNoticeRes.updatedAt = dayjs().toISOString()
    } else {
      throw new Error('no guild notice by id')
    }
  },
  [GuildNoticeActionTypes.DELETE_NOTICE] (_, payload) {
    const guildNoticeRes = dummyGuildNotices.find(guildNotice => guildNotice.id === payload)
    if (guildNoticeRes) {
      guildNoticeRes.updatedAt = dayjs().toISOString()
      guildNoticeRes.deletedAt = dayjs().toISOString()
    } else {
      throw new Error('no guild notice by id')
    }
  },
}
