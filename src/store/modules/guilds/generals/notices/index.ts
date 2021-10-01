import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { guildNoticeState, GuildNoticeState } from '@/store/modules/guilds/generals/notices/state'
import { guildNoticeGetters, GuildNoticeGetters } from '@/store/modules/guilds/generals/notices/getters'
import { guildNoticeMutations, GuildNoticeMutations } from '@/store/modules/guilds/generals/notices/mutations'
import { guildNoticeActions, GuildNoticeActions } from '@/store/modules/guilds/generals/notices/actions'

export type GuildNoticeStore<S = GuildNoticeState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof GuildNoticeMutations, P extends Parameters<GuildNoticeMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<GuildNoticeMutations[K]>
} & {
  getters: {
    [K in keyof GuildNoticeGetters]: ReturnType<GuildNoticeGetters[K]>;
  }
} & {
  dispatch<K extends keyof GuildNoticeActions>(
    key: K,
    payload?: Parameters<GuildNoticeActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<GuildNoticeActions[K]>
}

export const guildNoticeModule: Module<GuildNoticeState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: guildNoticeState,
  getters: guildNoticeGetters,
  mutations: guildNoticeMutations,
  actions: guildNoticeActions,
}
