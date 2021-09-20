import { MutationTree } from 'vuex'
import { UserState } from './state'
import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { Guild, GuildInDropdown } from '@/types/model/guilds'

export enum UserMutationTypes {
  SET_USER = 'user/SET_USER',
  SET_NOTIFICATIONS = 'user/SET_NOTIFICATIONS',
  SET_GUILD_LIST = 'user/SET_GUILD_LIST',
}
export type UserMutations<S = UserState> = {
  [UserMutationTypes.SET_USER](state: S, payload: User): void
  [UserMutationTypes.SET_NOTIFICATIONS](state: S, payload: Array<any>): void
  [UserMutationTypes.SET_GUILD_LIST](state: S, payload: Array<GuildInDropdown>): void
}

export const userMutations: MutationTree<UserState> & UserMutations = {
  [UserMutationTypes.SET_USER] (state, payload) {
    state.id = payload.id
    state.email = payload.email
    state.name = payload.name
    state.nickname = payload.nickname
    state.img = payload.img
    state.color = payload.color
    state.auth = payload.auth || 'staff'
  },
  [UserMutationTypes.SET_NOTIFICATIONS] (state, payload) {
    state.notifications = Object.assign(state.notifications, payload)
  },
  [UserMutationTypes.SET_GUILD_LIST] (state, payload) {
    state.guildList = Object.assign(state.guildList, payload)
  },
}
