// store.ts
import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { UserState } from '@/store/modules/user/state'
import { userModule, UserStore } from '@/store/modules/user'
import { HomeState } from '@/store/modules/home/state'
import { homeModule, HomeStore } from '@/store/modules/home'
import { GuildState } from '@/store/modules/guilds/info/state'
import { guildModule, GuildStore } from '@/store/modules/guilds/info'
import { GuildAdminAppState } from '@/store/modules/guilds/admins/App/state'
import { guildAdminAppModule } from '@/store/modules/guilds/admins/App'
import { ApplicationState } from '@/store/modules/applications/state'
import { applicationModule, ApplicationStore } from '@/store/modules/applications'

// define your typings for the store state
export interface RootState {
  application: ApplicationState
  user: UserState
  home: HomeState
  guild: GuildState
  guildAdminApp: GuildAdminAppState
  count: number
}

export type RootStore =
  ApplicationStore<Pick<RootState, 'application'>> &
  UserStore<Pick<RootState, 'user'>> &
  HomeStore<Pick<RootState, 'home'>> &
  GuildStore<Pick<RootState, 'guild'>> &
  GuildStore<Pick<RootState, 'guildAdminApp'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    application: applicationModule,
    user: userModule,
    home: homeModule,
    guild: guildModule,
    guildAdminApp: guildAdminAppModule,
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
