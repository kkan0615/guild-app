import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildAppState, GuildAppState } from './state'
import { guildAppGetters, GuildAppGetters } from './getters'
import { guildAppMutations, GuildAppMutations } from './mutations'
import { guildAppActions, GuildAppActions } from './actions'

export type GuildNoticeStore<S = GuildAppState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildAppMutations, P extends Parameters<GuildAppMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildAppMutations[K]>
} & {
  getters: {
    [K in keyof GuildAppGetters]: ReturnType<GuildAppGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildAppActions>(
    key: K,
    payload?: Parameters<GuildAppActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildAppActions[K]>
}

export const guildNoticeModule: Module<GuildAppState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildAppState,
  getters: guildAppGetters,
  mutations: guildAppMutations,
  actions: guildAppActions,
}
