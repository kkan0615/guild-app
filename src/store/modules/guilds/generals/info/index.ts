import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildState, GuildState } from '@/store/modules/guilds/generals/info/state'
import { guildGetters, GuildGetters } from '@/store/modules/guilds/generals/info/getters'
import { guildMutations, GuildMutations } from '@/store/modules/guilds/generals/info/mutations'
import { guildActions, GuildActions } from '@/store/modules/guilds/generals/info/actions'

export type GuildStore<S = GuildState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildMutations, P extends Parameters<GuildMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildMutations[K]>
} & {
  getters: {
    [K in keyof GuildGetters]: ReturnType<GuildGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildActions>(
    key: K,
    payload?: Parameters<GuildActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildActions[K]>
}

export const guildModule: Module<GuildState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildState,
  getters: guildGetters,
  mutations: guildMutations,
  actions: guildActions,
}
