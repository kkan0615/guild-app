// store.ts
import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { UserState } from '@/store/modules/user/state'
import { userModule, UserStore } from '@/store/modules/user'

// define your typings for the store state
export interface RootState {
  user: UserState
  count: number
}

export type RootStore =
  UserStore<Pick<RootState, 'user'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    user: userModule,
  }
  // state: {
  //   count: 50
  // },
  // mutations: {
  //   setCount: (state, payload) => {
  //     state.count = payload
  //   }
  // },
  // actions: {
  //   increaseCount: ({ commit, state }) => {
  //     commit('setCount', state.count + 1)
  //   }
  // }
})

/**
 * Hooks
 */
export default function useStore (): RootStore {
  return store as RootStore
}
