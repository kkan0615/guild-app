import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { HomeState } from '@/store/modules/home/state'
import { GuildInfo } from '@/types/model/guilds'

export type HomeGetters<S = HomeState> = {
  guildList(state: S): Array<GuildInfo>
}

export const homeGetters: GetterTree<HomeState, RootState> & HomeGetters = {
  guildList: (state) => {
    return state.guildList
  },
}
