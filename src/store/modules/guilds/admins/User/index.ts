import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildAdminUserState, GuildAdminUserState } from '@/store/modules/guilds/admins/User/state'
import { guildAdminUserGetters, GuildAdminUserGetters } from '@/store/modules/guilds/admins/User/getters'
import { guildAdminUserMutations, GuildAdminUserMutations } from '@/store/modules/guilds/admins/User/mutations'
import { guildAdminUserActions, GuildAdminUserActions } from '@/store/modules/guilds/admins/User/actions'

export type GuildAdminUserStore<S = GuildAdminUserState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildAdminUserMutations, P extends Parameters<GuildAdminUserMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildAdminUserMutations[K]>
} & {
  getters: {
    [K in keyof GuildAdminUserGetters]: ReturnType<GuildAdminUserGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildAdminUserActions>(
    key: K,
    payload?: Parameters<GuildAdminUserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildAdminUserActions[K]>
}

export const guildAdminUserModule: Module<GuildAdminUserState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildAdminUserState,
  getters: guildAdminUserGetters,
  mutations: guildAdminUserMutations,
  actions: guildAdminUserActions,
}
