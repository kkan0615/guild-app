import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { HomeState } from '@/store/modules/home/state'
import { GuildInDropdown } from '@/types/model/guilds'

export type HomeGetters<S = HomeState> = {
  guildList(state: S): Array<GuildInDropdown>
}

export const homeGetters: GetterTree<HomeState, RootState> & HomeGetters = {
  guildList: (state) => {
    return state.guildList
  },
}
