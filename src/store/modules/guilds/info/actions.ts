import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildInfo } from '@/types/model/guilds'
import { dummyGuilds } from '@/dummy/guilds'
import { GuildMutations, GuildMutationTypes } from '@/store/modules/guilds/info/mutations'
import { GuildState } from '@/store/modules/guilds/info/state'

export enum GuildActionTypes {
  LOAD_GUILD_INFO = 'guild/LOAD_GUILD_INFO',
  RESET_GUILD_INFO = 'guild/RESET_GUILD_INFO',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildMutations>(
    key: K,
    payload: Parameters<GuildMutations[K]>[1]
  ): ReturnType<GuildMutations[K]>
} & Omit<ActionContext<GuildState, RootState>, 'commit'>

export interface GuildActions {
  [GuildActionTypes.LOAD_GUILD_INFO](
    { commit }: AugmentedActionContext,
    payload: string
  ): void
  [GuildActionTypes.RESET_GUILD_INFO](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildActions: ActionTree<GuildState, RootState> & GuildActions = {
  [GuildActionTypes.LOAD_GUILD_INFO] ({ commit }, payload) {
    const guildInfoRes = dummyGuilds.find(dg => dg.uid === payload)
    if (guildInfoRes)
      commit(GuildMutationTypes.SET_GUILD_INFO, guildInfoRes)
    else {
      commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
      throw new Error('no data')
    }
  },
  [GuildActionTypes.RESET_GUILD_INFO] ({ commit }) {
    commit(GuildMutationTypes.SET_GUILD_INFO, {} as GuildInfo)
  },
}
