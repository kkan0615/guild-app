import { MutationTree } from 'vuex'
import { GuildState } from './state'
import { GuildInfo } from '@/types/model/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { Notification } from '@/types/systems/notification'

export enum GuildMutationTypes {
  SET_GUILD_INFO = 'guild/SET_GUILD_INFO',
  SET_GUILD_USER_INFO = 'guild/SET_GUILD_USER_INFO',
  SET_GUILD_USER_NOTIFICATION_LIST = 'guild/SET_GUILD_USER_NOTIFICATION_LIST',
  SET_IS_OPEN_SIDEBAR = 'guild/SET_IS_OPEN_SIDEBAR',
}
export type GuildMutations<S = GuildState> = {
  [GuildMutationTypes.SET_GUILD_INFO](state: S, payload: GuildInfo): void
  [GuildMutationTypes.SET_GUILD_USER_INFO](state: S, payload: GuildUserInfo): void
  [GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST](state: S, payload: Array<Notification>): void
  [GuildMutationTypes.SET_IS_OPEN_SIDEBAR](state: S, payload: boolean): void
}

export const guildMutations: MutationTree<GuildState> & GuildMutations = {
  [GuildMutationTypes.SET_GUILD_INFO] (state, payload) {
    state.guildInfo = Object.assign(state.guildInfo, payload)
  },
  [GuildMutationTypes.SET_GUILD_USER_INFO] (state, payload) {
    state.guildUserInfo = Object.assign(state.guildUserInfo, payload)
  },
  [GuildMutationTypes.SET_GUILD_USER_NOTIFICATION_LIST] (state, payload) {
    state.userNotificationList = Object.assign(state.userNotificationList, payload)
  },
  [GuildMutationTypes.SET_IS_OPEN_SIDEBAR] (state, payload) {
    state.isOpenSideBar = payload
  },
}
