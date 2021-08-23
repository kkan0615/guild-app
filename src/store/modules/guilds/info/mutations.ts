import { MutationTree } from 'vuex'
import { GuildState } from './state'
import { GuildInfo } from '@/types/model/guilds'

export enum GuildMutationTypes {
  SET_GUILD_INFO = 'guild/SET_GUILD_INFO',
}
export type GuildMutations<S = GuildState> = {
  [GuildMutationTypes.SET_GUILD_INFO](state: S, payload: GuildInfo): void
}

export const guildMutations: MutationTree<GuildState> & GuildMutations = {
  [GuildMutationTypes.SET_GUILD_INFO] (state, payload) {
    state.guildInfo = Object.assign(state.guildInfo, payload)
  },
}
