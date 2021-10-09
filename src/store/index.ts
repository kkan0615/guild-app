// store.ts
import { InjectionKey } from 'vue'
import { createLogger, createStore, Store } from 'vuex'
import { UserState } from '@/store/modules/user/state'
import { userModule, UserStore } from '@/store/modules/user'
import { HomeState } from '@/store/modules/home/state'
import { homeModule, HomeStore } from '@/store/modules/home'
import { GuildState } from '@/store/modules/guilds/generals/info/state'
import { guildModule, GuildStore } from '@/store/modules/guilds/generals/info'
import { GuildAdminAppState } from '@/store/modules/guilds/admins/App/state'
import { guildAdminAppModule, GuildAdminAppStore } from '@/store/modules/guilds/admins/App'
import { ApplicationState } from '@/store/modules/applications/state'
import { applicationModule, ApplicationStore } from '@/store/modules/applications'
import { GuildAdminUserState } from '@/store/modules/guilds/admins/User/state'
import { guildAdminUserModule, GuildAdminUserStore } from '@/store/modules/guilds/admins/User'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { guildAdminRoleModule, GuildAdminRoleStore } from '@/store/modules/guilds/admins/Role'
import { GuildUserState } from '@/store/modules/guilds/generals/users/state'
import { guildUserModule, GuildUserStore } from '@/store/modules/guilds/generals/users'
import { GuildCalendarState } from '@/store/modules/guilds/generals/calendars/state'
import { guildCalendarModule, GuildCalendarStore } from '@/store/modules/guilds/generals/calendars'
import { GuildAdminCalendarState } from '@/store/modules/guilds/admins/Calendar/state'
import { guildAdminCalendarModule, GuildAdminCalendarStore } from '@/store/modules/guilds/admins/Calendar'
import { GuildNoticeState } from '@/store/modules/guilds/generals/notices/state'
import { guildNoticeModule, GuildNoticeStore } from '@/store/modules/guilds/generals/notices'
import { guildPostModule, GuildPostStore } from '@/store/modules/guilds/generals/posts'
import { GuildPostState } from '@/store/modules/guilds/generals/posts/state'

// define your typings for the store state
export interface RootState {
  application: ApplicationState
  user: UserState
  home: HomeState
  guild: GuildState
  guildUser: GuildUserState
  guildCalendar: GuildCalendarState
  guildNotice: GuildNoticeState
  guildPost: GuildPostState
  guildAdminApp: GuildAdminAppState
  guildAdminUser: GuildAdminUserState
  guildAdminRole: GuildAdminRoleState
  guildAdminCalendar: GuildAdminCalendarState
  count: number
}

export type RootStore =
  ApplicationStore<Pick<RootState, 'application'>> &
  UserStore<Pick<RootState, 'user'>> &
  HomeStore<Pick<RootState, 'home'>> &
  GuildStore<Pick<RootState, 'guild'>> &
  GuildUserStore<Pick<RootState, 'guildUser'>> &
  GuildCalendarStore<Pick<RootState, 'guildCalendar'>> &
  GuildNoticeStore<Pick<RootState, 'guildNotice'>> &
  GuildPostStore<Pick<RootState, 'guildPost'>> &
  GuildAdminAppStore<Pick<RootState, 'guildAdminApp'>> &
  GuildAdminUserStore<Pick<RootState, 'guildAdminUser'>> &
  GuildAdminCalendarStore<Pick<RootState, 'guildAdminCalendar'>> &
  GuildAdminRoleStore<Pick<RootState, 'guildAdminRole'>>

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol()

/* Plugins */
const plugins = [createLogger()]

export const store = createStore<RootState>({
  plugins,
  modules: {
    application: applicationModule,
    user: userModule,
    home: homeModule,
    guild: guildModule,
    guildUser: guildUserModule,
    guildCalendar: guildCalendarModule,
    guildNotice: guildNoticeModule,
    guildPost: guildPostModule,
    guildAdminApp: guildAdminAppModule,
    guildAdminUser: guildAdminUserModule,
    guildAdminRole: guildAdminRoleModule,
    guildAdminCalendar: guildAdminCalendarModule,
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
