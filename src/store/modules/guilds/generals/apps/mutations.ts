import { MutationTree } from 'vuex'
import { GuildAppState } from './state'
import { GuildNotice } from '@/types/model/guilds/notice'
import _ from 'lodash'

export enum GuildAppMutationTypes {
  SET_NOTICE_LIST = 'guildNotice/SET_NOTICE_LIST',
}

export type GuildAppMutations<S = GuildAppState> = {
  [GuildAppMutationTypes.SET_NOTICE_LIST](state: S, payload: Array<GuildNotice>): void
}

export const guildAppMutations: MutationTree<GuildAppState> & GuildAppMutations = {
  [GuildAppMutationTypes.SET_NOTICE_LIST] (state, payload) {
    state.noticeList = _.cloneDeep(payload)
  },
}
