import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminUserState } from '@/store/modules/guilds/admins/User/state'
import { GuildJoinInfo } from '@/types/model/guilds/join'

export type GuildAdminUserGetters<S = GuildAdminUserState> = {
  joinForms(state: S): Array<GuildJoinInfo>
}

export const guildAdminUserGetters: GetterTree<GuildAdminUserState, RootState> & GuildAdminUserGetters = {
  joinForms: (state) => state.joinForms,
}
