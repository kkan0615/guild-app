import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildUserState, GuildUserState } from '@/store/modules/guilds/users/state'
import { guildUserGetters, GuildUserGetters } from '@/store/modules/guilds/users/getters'
import { guildUserMutations, GuildUserMutations } from '@/store/modules/guilds/users/mutations'
import { guildUserActions, GuildUserActions } from '@/store/modules/guilds/users/actions'

export type GuildUserStore<S = GuildUserState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildUserMutations, P extends Parameters<GuildUserMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildUserMutations[K]>
} & {
  getters: {
    [K in keyof GuildUserGetters]: ReturnType<GuildUserGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildUserActions>(
    key: K,
    payload?: Parameters<GuildUserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildUserActions[K]>
}

export const guildUserModule: Module<GuildUserState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildUserState,
  getters: guildUserGetters,
  mutations: guildUserMutations,
  actions: guildUserActions,
}
