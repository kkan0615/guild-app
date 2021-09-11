import { GuildJoinInfo } from '@/types/model/guilds/join'
import { GuildUserSelectListQuery } from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'

export interface GuildAdminUserState {
  joinForms: Array<GuildJoinInfo>
  userFilterOption: GuildUserSelectListQuery
  blackList: Array<GuildBlackInfo>
}

export const guildAdminUserState: GuildAdminUserState = {
  joinForms: [],
  userFilterOption: {} as GuildUserSelectListQuery,
  blackList: [],
}
