import { MutationTree } from 'vuex'
import { GuildState } from './state'
import { GuildInfo } from '@/types/model/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'

export enum GuildMutationTypes {
  SET_GUILD_INFO = 'guild/SET_GUILD_INFO',
  SET_GUILD_USER_INFO = 'guild/SET_GUILD_USER_INFO',
}
export type GuildMutations<S = GuildState> = {
  [GuildMutationTypes.SET_GUILD_INFO](state: S, payload: GuildInfo): void
  [GuildMutationTypes.SET_GUILD_USER_INFO](state: S, payload: GuildUserInfo): void
}

export const guildMutations: MutationTree<GuildState> & GuildMutations = {
  [GuildMutationTypes.SET_GUILD_INFO] (state, payload) {
    state.guildInfo = Object.assign(state.guildInfo, payload)
  },
  [GuildMutationTypes.SET_GUILD_USER_INFO] (state, payload) {
    state.guildUserInfo = Object.assign(state.guildUserInfo, payload)
  },
}
