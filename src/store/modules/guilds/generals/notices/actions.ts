import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildNoticeMutations, GuildNoticeMutationTypes } from '@/store/modules/guilds/generals/notices/mutations'
import { GuildNoticeState } from '@/store/modules/guilds/generals/notices/state'


export enum GuildNoticeActionTypes {
  LOAD_NOTICE_LIST = 'guildNotice/LOAD_NOTICE_LIST',
  RESET_NOTICE_LIST = 'guildNotice/RESET_NOTICE_LIST',
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
}

export const guildNoticeActions: ActionTree<GuildNoticeState, RootState> & GuildNoticeActions = {
  [GuildNoticeActionTypes.LOAD_NOTICE_LIST] ({ commit }) {
    console.log('LOAD_NOTICE_LIST')
    commit(GuildNoticeMutationTypes.SET_NOTICE_LIST, [])
  },
  [GuildNoticeActionTypes.RESET_NOTICE_LIST] ({ commit }) {
    commit(GuildNoticeMutationTypes.SET_NOTICE_LIST, [])
  },
}
