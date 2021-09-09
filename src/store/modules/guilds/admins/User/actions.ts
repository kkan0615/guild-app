import { ActionContext, ActionTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminUserMutations, GuildAdminUserMutationTypes } from '@/store/modules/guilds/admins/User/mutations'
import { GuildAdminUserState } from '@/store/modules/guilds/admins/User/state'
import { dummyGuildJoins } from '@/dummy/guilds/joins'
import { GuildJoinInfo } from '@/types/model/guilds/join'
import { dummyUsers } from '@/dummy/user'
import { User } from '@/types/model/auth/user/user'

export enum GuildAdminUserActionTypes {
  LOAD_GUILD_JOIN_FORMS = 'guildAdminUser/LOAD_GUILD_JOIN_FORMS',
  RESET_GUILD_JOIN_FORMS = 'guildAdminUser/RESET_GUILD_JOIN_FORMS',
}

export type AugmentedActionContext = {
  commit<K extends keyof GuildAdminUserMutations>(
    key: K,
    payload?: Parameters<GuildAdminUserMutations[K]>[1]
  ): ReturnType<GuildAdminUserMutations[K]>
} & Omit<ActionContext<GuildAdminUserState, RootState>, 'commit'>

export interface GuildAdminUserActions {
  [GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS](
    { commit }: AugmentedActionContext,
  ): void
  [GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS](
    { commit }: AugmentedActionContext,
  ): void
}

export const guildAdminUserActions: ActionTree<GuildAdminUserState, RootState> & GuildAdminUserActions = {
  [GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS] ({ commit, rootState }) {
    const guildUid = rootState.guild.guildInfo.uid
    if (guildUid) {
      const joinFormsRes = dummyGuildJoins.filter(dgj => dgj.guildId === guildUid)
      const joinForms = joinFormsRes.map(jfr => {
        return {
          ...jfr,
          User: dummyUsers.find(du => du.uid === jfr.userId) || {} as User
        } as GuildJoinInfo
      })
      commit(GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS, joinForms)
    } else {
      throw new Error('no uid')
    }
  },
  [GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS] ({ commit }) {
    commit(GuildAdminUserMutationTypes.SET_GUILD_JOIN_FORMS, [])
  },
}
