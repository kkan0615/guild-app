import { GuildJoinInfo } from '@/types/model/guilds/join'

export interface GuildAdminUserState {
  joinForms: Array<GuildJoinInfo>
}

export const guildAdminUserState: GuildAdminUserState = {
  joinForms: [],
}
