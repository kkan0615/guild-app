import { GuildJoinInfo } from '@/types/model/guilds/join'
import {
  GuildUserAtAdminDetail,
  GuildUserAtAdminUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'

export interface GuildAdminUserState {
  userList: Array<GuildUserAtAdminUserList>
  userFilterOption: GuildUserSelectListQuery
  joinForms: Array<GuildJoinInfo>
  blackList: Array<GuildBlackInfo>
  userDetail: GuildUserAtAdminDetail
}

export const guildAdminUserState: GuildAdminUserState = {
  userList: [],
  userFilterOption: {} as GuildUserSelectListQuery,
  joinForms: [],
  blackList: [],
  userDetail: {} as GuildUserAtAdminDetail,
}
