import { MutationTree } from 'vuex'
import { HomeState } from './state'
import { GuildInfo, GuildInfoInList, GuildListFilterQuery } from '@/types/model/guilds'
import _ from 'lodash'

export enum HomeMutationTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  SET_TOTAL_GUILD_LIST = 'home/SET_TOTAL_GUILD_LIST',
  SET_GUILD_LIST = 'home/SET_GUILD_LIST',
  SET_GUILD_LIST_LOADING = 'home/SET_GUILD_LIST_LOADING',
  SET_GUILD_INFO = 'home/SET_GUILD_INFO',
}
export type HomeMutations<S = HomeState> = {
  [HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION](state: S, payload: GuildListFilterQuery): void
  [HomeMutationTypes.SET_TOTAL_GUILD_LIST](state: S, payload: number): void
  [HomeMutationTypes.SET_GUILD_LIST](state: S, payload: Array<GuildInfoInList>): void
  [HomeMutationTypes.SET_GUILD_LIST_LOADING](state: S, payload: boolean): void
  [HomeMutationTypes.SET_GUILD_INFO](state: S, payload: GuildInfo): void
}

export const homeMutations: MutationTree<HomeState> & HomeMutations = {
  [HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION] (state, payload) {
    state.guildListFilterOption = payload
  },
  [HomeMutationTypes.SET_TOTAL_GUILD_LIST] (state, payload) {
    state.totalGuildList = payload
  },
  [HomeMutationTypes.SET_GUILD_LIST] (state, payload) {
    state.guildList = _.cloneDeep(payload)
  },
  [HomeMutationTypes.SET_GUILD_LIST_LOADING] (state, payload) {
    state.guildListLoading = payload
  },
  [HomeMutationTypes.SET_GUILD_INFO] (state, payload) {
    state.guildInfo = Object.assign(state.guildInfo, payload)
  },
}
