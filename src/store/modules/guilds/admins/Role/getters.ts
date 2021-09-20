import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { GuildAdminRoleState } from '@/store/modules/guilds/admins/Role/state'
import { GuildRole } from '@/types/model/guilds/role'

export type GuildAdminRoleGetters<S = GuildAdminRoleState> = {
  roleList(state: S): Array<any>
  sortedRoleList(state: S): Array<GuildRole>
}

export const guildAdminRoleGetters: GetterTree<GuildAdminRoleState, RootState> & GuildAdminRoleGetters = {
  roleList: (state) => state.roleList,
  sortedRoleList: state => state.roleList.sort((a, b) => a.index - (b.index + 1))!
}
