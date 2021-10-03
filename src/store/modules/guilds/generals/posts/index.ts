import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildPostState, GuildPostState } from './state'
import { guildPostGetters, GuildPostGetters } from './getters'
import { guildPostMutations, GuildPostMutations } from './mutations'
import { guildPostActions, GuildPostActions } from './actions'

export type GuildPostStore<S = GuildPostState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildPostMutations, P extends Parameters<GuildPostMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildPostMutations[K]>
} & {
  getters: {
    [K in keyof GuildPostGetters]: ReturnType<GuildPostGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildPostActions>(
    key: K,
    payload?: Parameters<GuildPostActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildPostActions[K]>
}

export const guildPostModule: Module<GuildPostState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildPostState,
  getters: guildPostGetters,
  mutations: guildPostMutations,
  actions: guildPostActions,
}
