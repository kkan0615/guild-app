import { MutationTree } from 'vuex'
import { GuildUserState } from './state'
import {
  GuildUserAtUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'
import _ from 'lodash'

export enum GuildUserMutationTypes {
  SET_USER_LIST = 'guildUser/SET_USER_LIST',
  SET_USER_FILTER_OPTION = 'guildUser/SET_USER_FILTER_OPTION',
}
export type GuildUserMutations<S = GuildUserState> = {
  [GuildUserMutationTypes.SET_USER_LIST](state: S, payload: Array<GuildUserAtUserList>): void
  [GuildUserMutationTypes.SET_USER_FILTER_OPTION](state: S, payload: GuildUserSelectListQuery): void
}

export const guildUserMutations: MutationTree<GuildUserState> & GuildUserMutations = {
  [GuildUserMutationTypes.SET_USER_LIST] (state, payload) {
    state.userList = _.cloneDeep(payload)
  },
  [GuildUserMutationTypes.SET_USER_FILTER_OPTION] (state, payload) {
    state.userFilterOption = payload
  },
}
