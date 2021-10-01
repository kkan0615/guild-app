import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildNotice } from '@/types/model/guilds/notice'
import { GuildAppState } from './state'

export type GuildAppGetters<S = GuildAppState> = {
  noticeList(state: S): Array<GuildNotice>
}

export const guildAppGetters: GetterTree<GuildAppState, RootState> & GuildAppGetters = {
  noticeList: (state) => {
    return state.noticeList
  },
}
