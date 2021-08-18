import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { homeState, HomeState } from '@/store/modules/home/state'
import { homeGetters, HomeGetters } from '@/store/modules/home/getters'
import { homeMutations, HomeMutations } from '@/store/modules/home/mutations'
import { homeActions, HomeActions } from '@/store/modules/home/actions'

export type HomeStore<S = HomeState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof HomeMutations, P extends Parameters<HomeMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<HomeMutations[K]>
} & {
  getters: {
    [K in keyof HomeGetters]: ReturnType<HomeGetters[K]>;
  }
} & {
  dispatch<K extends keyof HomeActions>(
    key: K,
    payload?: Parameters<HomeActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<HomeActions[K]>
}

export const homeModule: Module<HomeState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: homeState,
  getters: homeGetters,
  mutations: homeMutations,
  actions: homeActions,
}
