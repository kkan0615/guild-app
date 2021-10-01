import { MutationTree } from 'vuex'
import { GuildNoticeState } from './state'
import { GuildNotice } from '@/types/model/guilds/notice'
import _ from 'lodash'

export enum GuildNoticeMutationTypes {
  SET_NOTICE_LIST = 'guildNotice/SET_NOTICE_LIST',
}

export type GuildNoticeMutations<S = GuildNoticeState> = {
  [GuildNoticeMutationTypes.SET_NOTICE_LIST](state: S, payload: Array<GuildNotice>): void
}

export const guildNoticeMutations: MutationTree<GuildNoticeState> & GuildNoticeMutations = {
  [GuildNoticeMutationTypes.SET_NOTICE_LIST] (state, payload) {
    state.noticeList = _.cloneDeep(payload)
  },
}
