import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildAdminCalendarState, GuildAdminCalendarState } from '@/store/modules/guilds/admins/Calendar/state'
import { guildAdminCalendarGetters, GuildAdminCalendarGetters } from '@/store/modules/guilds/admins/Calendar/getters'
import { guildAdminCalendarMutations, GuildAdminCalendarMutations } from '@/store/modules/guilds/admins/Calendar/mutations'
import { guildAdminCalendarActions, GuildAdminCalendarActions } from '@/store/modules/guilds/admins/Calendar/actions'

export type GuildAdminCalendarStore<S = GuildAdminCalendarState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildAdminCalendarMutations, P extends Parameters<GuildAdminCalendarMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildAdminCalendarMutations[K]>
} & {
  getters: {
    [K in keyof GuildAdminCalendarGetters]: ReturnType<GuildAdminCalendarGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildAdminCalendarActions>(
    key: K,
    payload?: Parameters<GuildAdminCalendarActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildAdminCalendarActions[K]>
}

export const guildAdminCalendarModule: Module<GuildAdminCalendarState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildAdminCalendarState,
  getters: guildAdminCalendarGetters,
  mutations: guildAdminCalendarMutations,
  actions: guildAdminCalendarActions,
}
