import { ActionContext, ActionTree } from 'vuex'
import { UserMutations, UserMutationTypes } from './mutations'
import { userState, UserState } from './state'
import { RootState } from '@/store'
import { v4 } from 'uuid'
import { UserLoginForm } from '@/types/model/auth/user/user'
import { LocalstorageKeyEnum } from '@/types/systems/localstrage'
import { dummyGuilds } from '@/dummy/guilds'
import { dummyGuildUsers, dummyUsers } from '@/dummy/user'

export enum UserActionTypes {
  SET_USER = 'user/USER_SET_USER',
  UPDATE_USER = 'user/USER_UPDATE_USER',
  LOGIN = 'user/USER_LOGIN',
  LOGOUT = 'user/USER_LOGOUT',
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
    { commit, dispatch }: AugmentedActionContext,
    payload: string
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
  async [UserActionTypes.UPDATE_USER] ({ commit, dispatch }, payload) {
    const userInfo = dummyUsers.find((du) => {
      return du.uid === payload
    })
    if (!userInfo) {
      await dispatch(UserActionTypes.LOGOUT)
      throw new Error('fail to get user data')
    }

    /* Save token to localstorage */
    localStorage.setItem(LocalstorageKeyEnum.ACCESS_TOKEN, payload)

    /* Set users */
    commit(UserMutationTypes.SET_USER, {
      ...userInfo,
      uid: payload,
    })
    /* Set notifications */
    commit(UserMutationTypes.SET_NOTIFICATIONS, [])
    const joinedGuildsRes = dummyGuilds.filter(dg => dg.memberIds.indexOf(payload))
    let guildListRes = joinedGuildsRes.map(joinedGuild =>{
      return {
        uid: joinedGuild.uid,
        img: joinedGuild.img,
        name: joinedGuild.name,
      }
    })
    /* @TODO: After test, remove it */
    const foundGuildTest = dummyGuilds.find((dg) => dg.uid === 'test-uid')
    if (foundGuildTest)
      guildListRes = guildListRes.concat([{
        uid: foundGuildTest.uid,
        img: foundGuildTest.img,
        name: foundGuildTest.name
      }])
    commit(UserMutationTypes.SET_GUILD_LIST, guildListRes)
  },
  async [UserActionTypes.LOGIN] ({ dispatch }, payload) {
    let result = false
    /* Update Index */
    try {
      /* Try to login */
      const loggedInRes = dummyUsers.find((du) => {
        return du.email === payload.email
      })
      /* If it's success to login */
      if (loggedInRes) {
        await dispatch(UserActionTypes.UPDATE_USER, loggedInRes.uid)
        result = true
      }
    } catch (e) {
      console.error(e)
      result = false
    }

    return result
  },
  [UserActionTypes.LOGOUT] ({ commit }) {
    localStorage.removeItem(LocalstorageKeyEnum.ACCESS_TOKEN)
    commit(UserMutationTypes.SET_USER, {} as UserState)
    commit(UserMutationTypes.SET_NOTIFICATIONS, [])
    commit(UserMutationTypes.SET_GUILD_LIST, [])
  },
}
