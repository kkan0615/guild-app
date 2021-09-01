import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminAppState } from '@/store/modules/guilds/admins/App/state'

export type GuildAdminAppGetters<S = GuildAdminAppState> = {
  isOpenSidebar(state: S): boolean
}

export const guildAdminAppGetters: GetterTree<GuildAdminAppState, RootState> & GuildAdminAppGetters = {
  isOpenSidebar: (state) => state.isOpenSideBar,
}
