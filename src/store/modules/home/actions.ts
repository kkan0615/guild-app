import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { v4 } from 'uuid'
import { User, UserLoginForm } from '@/types/model/auth/user'
import { LocalstorageKeyEnum } from '@/types/systems/localstrage'
import { HomeMutations, HomeMutationTypes } from '@/store/modules/home/mutations'
import { HomeState } from '@/store/modules/home/state'
import { GuildInfo, GuildListFilterQuery } from '@/types/model/guilds'

export enum HomeActionTypes {
  SET_GUILD_LIST_FILTER_OPTION = 'home/SET_GUILD_LIST_FILTER_OPTION',
  LOAD_GUILD_LIST = 'home/LOAD_GUILD_LIST',
  RESET_GUILD_LIST = 'home/RESET_GUILD_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof HomeMutations>(
    key: K,
    payload: Parameters<HomeMutations[K]>[1]
  ): ReturnType<HomeMutations[K]>
} & Omit<ActionContext<HomeState, RootState>, 'commit'>

export interface HomeActions {
  [HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION](
    { commit }: AugmentedActionContext,
    payload: GuildListFilterQuery
  ): void
  [HomeActionTypes.LOAD_GUILD_LIST](
    { commit }: AugmentedActionContext,
  ): void
  [HomeActionTypes.RESET_GUILD_LIST](
    { commit }: AugmentedActionContext,
  ): void
}

export const homeActions: ActionTree<HomeState, RootState> & HomeActions = {
  [HomeActionTypes.SET_GUILD_LIST_FILTER_OPTION] ({ commit }, payload) {
    commit(HomeMutationTypes.SET_GUILD_LIST_FILTER_OPTION, payload)
  },
  async [HomeActionTypes.LOAD_GUILD_LIST] ({ commit }) {
    const guildListRes:Array<GuildInfo> = [
      {
        uid: v4(),
        img: 'https://octodex.github.com/images/saketocat.png',
        name: 'Test 01',
        tagIds: [],
        tags: [],
        mainManger: {} as User,
        mainMangerId: v4(),
        description: 'This is test data',
      },
      {
        uid: v4(),
        img: 'https://octodex.github.com/images/saketocat.png',
        name: 'Test 02',
        tagIds: [],
        tags: [],
        mainManger: {} as User,
        mainMangerId: v4(),
        description: 'This is test data',
      },
    ]
    commit(HomeMutationTypes.SET_GUILD_LIST, guildListRes)
  },
  async [HomeActionTypes.RESET_GUILD_LIST] ({ commit }) {
    commit(HomeMutationTypes.SET_GUILD_LIST, [])
  },
}
