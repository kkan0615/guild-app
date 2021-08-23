import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildInfo } from '@/types/model/guilds'
import { GuildState } from '@/store/modules/guilds/info/state'

export type GuildGetters<S = GuildState> = {
  guildInfo(state: S): GuildInfo
}

export const guildGetters: GetterTree<GuildState, RootState> & GuildGetters = {
  guildInfo: (state) => {
    return state.guildInfo
  },
}
