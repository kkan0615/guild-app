import {
  Store as VuexStore,
  Module,
  CommitOptions,
  DispatchOptions,
} from 'vuex'
import { RootState } from '@/store'
import { userState, UserState } from '@/store/modules/user/state'
import { userGetters, UserGetters } from '@/store/modules/user/getters'
import { userMutations, UserMutations } from '@/store/modules/user/mutations'
import { UserActions, userActions } from '@/store/modules/user/actions'

export type UserStore<S = UserState> = Omit<
VuexStore<S>,
'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof UserMutations, P extends Parameters<UserMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<UserMutations[K]>
} & {
  getters: {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>;
  }
} & {
  dispatch<K extends keyof UserActions>(
    key: K,
    payload?: Parameters<UserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActions[K]>
}

export const userModule: Module<UserState, RootState> = {
  // @TODO: namespaced has bug now
  // namespaced: true,
  namespaced: false,
  state: userState,
  getters: userGetters,
  mutations: userMutations,
  actions: userActions,
}
