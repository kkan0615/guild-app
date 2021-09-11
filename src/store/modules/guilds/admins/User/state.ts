import { GuildJoinInfo } from '@/types/model/guilds/join'
import { GuildUserAtAdminUserList, GuildUserSelectListQuery } from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'

export interface GuildAdminUserState {
  userList: Array<GuildUserAtAdminUserList>
  userFilterOption: GuildUserSelectListQuery
  joinForms: Array<GuildJoinInfo>
  blackList: Array<GuildBlackInfo>
}

export const guildAdminUserState: GuildAdminUserState = {
  userList: [],
  userFilterOption: {} as GuildUserSelectListQuery,
  joinForms: [],
  blackList: [],
}
