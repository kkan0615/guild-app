import { GuildRole } from '@/types/model/guilds/role'

export interface GuildAdminRoleState {
  roleList: Array<GuildRole>
  selectedRole: GuildRole
}

export const guildAdminRoleState: GuildAdminRoleState = {
  roleList: [],
  selectedRole: {} as GuildRole
}
