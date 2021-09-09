import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildAdminAppState, GuildAdminAppState } from '@/store/modules/guilds/admins/App/state'
import { guildAdminAppGetters, GuildAdminAppGetters } from '@/store/modules/guilds/admins/App/getters'
import { guildAdminAppMutations, GuildAdminAppMutations } from '@/store/modules/guilds/admins/App/mutations'
import { guildAdminAppActions, GuildAdminAppActions } from '@/store/modules/guilds/admins/App/actions'

export type GuildAdminAppStore<S = GuildAdminAppState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildAdminAppMutations, P extends Parameters<GuildAdminAppMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildAdminAppMutations[K]>
} & {
  getters: {
    [K in keyof GuildAdminAppGetters]: ReturnType<GuildAdminAppGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildAdminAppActions>(
    key: K,
    payload?: Parameters<GuildAdminAppActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildAdminAppActions[K]>
}

export const guildAdminAppModule: Module<GuildAdminAppState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildAdminAppState,
  getters: guildAdminAppGetters,
  mutations: guildAdminAppMutations,
  actions: guildAdminAppActions,
}
