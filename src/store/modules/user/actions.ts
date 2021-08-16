import { ActionContext, ActionTree } from 'vuex'
import { UserMutations, UserMutationTypes } from './mutations'
import { userState, UserState } from './state'
import { RootState } from '@/store'
import { v4 } from 'uuid'
import { UserLoginForm } from '@/types/model/auth/user'

export enum UserActionTypes {
  SET_USER = 'user/USER_SET_USER',
  UPDATE_USER = 'user/USER_UPDATE_USER',
  LOGIN = 'user/USER_LOGIN',
  LOGOUT = 'user/USER_LOGOUT'
}

export type AugmentedActionContext = {
  commit<K extends keyof UserMutations>(
    key: K,
    payload: Parameters<UserMutations[K]>[1]
  ): ReturnType<UserMutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface UserActions {
  [UserActionTypes.SET_USER](
    { commit }: AugmentedActionContext,
    payload: UserState
  ): void
  [UserActionTypes.UPDATE_USER](
    { commit }: AugmentedActionContext,
  ): void
  /**
   * Login User
   * @param dispatch
   * @param payload
   * @return if success return true, else return false
   */
  [UserActionTypes.LOGIN](
    { dispatch }: AugmentedActionContext,
    payload: UserLoginForm
  ): Promise<boolean>
  [UserActionTypes.LOGOUT](
    { commit }: AugmentedActionContext,
  ): void
}

export const userActions: ActionTree<UserState, RootState> & UserActions = {
  [UserActionTypes.SET_USER] ({ commit }, payload) {
    commit(UserMutationTypes.SET_USER, payload)
  },
  async [UserActionTypes.UPDATE_USER] ({ commit }) {
    commit(UserMutationTypes.SET_USER, {
      uid: v4(),
      color: 'EEA4A5D',
      name: 'Master',
      email: 'master@admin.com',
      nickname: 'Master',
      img: '',
      auth: 'superAdmin',
    })
  },
  async [UserActionTypes.LOGIN] ({ dispatch }, payload) {
    let result = false
    /* Update User */
    try {
      await dispatch(UserActionTypes.UPDATE_USER)
      result = true
    } catch (e) {
      console.error(e)
      result = false
    }

    return result
  },
  [UserActionTypes.LOGOUT] ({ commit }) {
    commit(UserMutationTypes.SET_USER, userState)
  },
}
