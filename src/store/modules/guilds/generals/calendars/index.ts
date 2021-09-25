import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildCalendarState, GuildCalendarState } from '@/store/modules/guilds/generals/calendars/state'
import { guildCalendarGetters, GuildCalendarGetters } from '@/store/modules/guilds/generals/calendars/getters'
import { guildCalendarMutations, GuildCalendarMutations } from '@/store/modules/guilds/generals/calendars/mutations'
import { guildCalendarActions, GuildCalendarActions } from '@/store/modules/guilds/generals/calendars/actions'

export type GuildCalendarStore<S = GuildCalendarState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildCalendarMutations, P extends Parameters<GuildCalendarMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildCalendarMutations[K]>
} & {
  getters: {
    [K in keyof GuildCalendarGetters]: ReturnType<GuildCalendarGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildCalendarActions>(
    key: K,
    payload?: Parameters<GuildCalendarActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildCalendarActions[K]>
}

export const guildCalendarModule: Module<GuildCalendarState, RootState> = {
  namespaced: false,
  state: guildCalendarState,
  getters: guildCalendarGetters,
  mutations: guildCalendarMutations,
  actions: guildCalendarActions,
}
