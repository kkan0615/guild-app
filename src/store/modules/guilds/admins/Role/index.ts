import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildAdminRoleState, GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { guildAdminRoleGetters, GuildAdminRoleGetters } from '@/store/modules/guilds/admins/Role/getters'
import { guildAdminRoleMutations, GuildAdminRoleMutations } from '@/store/modules/guilds/admins/Role/mutations'
import { guildAdminRoleActions, GuildAdminRoleActions } from '@/store/modules/guilds/admins/Role/actions'

export type GuildAdminRoleStore<S = GuildAdminRoleState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildAdminRoleMutations, P extends Parameters<GuildAdminRoleMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildAdminRoleMutations[K]>
} & {
  getters: {
    [K in keyof GuildAdminRoleGetters]: ReturnType<GuildAdminRoleGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildAdminRoleActions>(
    key: K,
    payload?: Parameters<GuildAdminRoleActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildAdminRoleActions[K]>
}

export const guildAdminRoleModule: Module<GuildAdminRoleState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildAdminRoleState,
  getters: guildAdminRoleGetters,
  mutations: guildAdminRoleMutations,
  actions: guildAdminRoleActions,
}
