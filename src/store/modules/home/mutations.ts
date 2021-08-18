import { MutationTree } from 'vuex'
import { HomeState } from './state'
import { GuildInfo, GuildListFilterQuery } from '@/types/model/guilds'

export enum HomeMutationTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  SET_GUILD_LIST = 'home/SET_GUILD_LIST',
}
export type HomeMutations<S = HomeState> = {
  [HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION](state: S, payload: GuildListFilterQuery): void
  [HomeMutationTypes.SET_GUILD_LIST](state: S, payload: Array<GuildInfo>): void
}

export const homeMutations: MutationTree<HomeState> & HomeMutations = {
  [HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION] (state, payload) {
    state.guildListFilterOption = payload
  },
  [HomeMutationTypes.SET_GUILD_LIST] (state, payload) {
    state.guildList = Object.assign(state.guildList, payload)
  },
}
