import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildNotice } from '@/types/model/guilds/notice'
import { GuildPostState } from './state'
import { GuildPostInfo } from '@/types/model/guilds/post'

export type GuildPostGetters<S = GuildPostState> = {
  postListByBoard(state: S): Array<GuildPostInfo>
}

export const guildPostGetters: GetterTree<GuildPostState, RootState> & GuildPostGetters = {
  postListByBoard: (state) => {
    return state.postListByBoard
  },
}
