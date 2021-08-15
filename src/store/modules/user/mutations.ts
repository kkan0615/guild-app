import { MutationTree } from 'vuex'
import { UserState } from './state'
import { User } from '@/types/model/auth/user'

export enum UserMutationTypes {
  SET_USER = 'user/SET_USER',
}
export type UserMutations<S = UserState> = {
  [UserMutationTypes.SET_USER](state: S, payload: User): void
}

export const userMutations: MutationTree<UserState> & UserMutations = {
  [UserMutationTypes.SET_USER] (state, payload) {
    state.uid = payload.uid
    state.email = payload.email
    state.name = payload.name
    state.nickname = payload.nickname
    state.img = payload.img
    state.color = payload.color
    state.auth = payload.auth || 'staff'
  },
}
