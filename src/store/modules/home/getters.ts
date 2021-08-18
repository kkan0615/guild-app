import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { HomeState } from '@/store/modules/home/state'

export type HomeGetters<S = HomeState> = {
  guildList(state: S): Array<any>
}

export const homeGetters: GetterTree<HomeState, RootState> & HomeGetters = {
  guildList: (state) => {
    return state.guildList
  },
}
