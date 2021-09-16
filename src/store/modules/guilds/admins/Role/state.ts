import { GuildRole, GuildRoleAtAdmin } from '@/types/model/guilds/role'

export interface GuildAdminRoleState {
  roleList: Array<GuildRole>
  selectedRole: GuildRoleAtAdmin
  mode: 'READ' | 'UPDATE'
}

export const guildAdminRoleState: GuildAdminRoleState = {
  roleList: [],
  selectedRole: {} as GuildRoleAtAdmin,
  mode: 'READ',
}
