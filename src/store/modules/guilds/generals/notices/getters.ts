import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildNotice } from '@/types/model/guilds/notice'
import { GuildNoticeState } from '@/store/modules/guilds/generals/notices/state'

export type GuildNoticeGetters<S = GuildNoticeState> = {
  noticeList(state: S): Array<GuildNotice>
}

export const guildNoticeGetters: GetterTree<GuildNoticeState, RootState> & GuildNoticeGetters = {
  noticeList: (state) => {
    return state.noticeList
  },
}
