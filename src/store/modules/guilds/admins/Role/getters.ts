import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'

export type GuildAdminRoleGetters<S = GuildAdminRoleState> = {
  roleList(state: S): Array<any>
}

export const guildAdminRoleGetters: GetterTree<GuildAdminRoleState, RootState> & GuildAdminRoleGetters = {
  roleList: (state) => state.roleList,
}
