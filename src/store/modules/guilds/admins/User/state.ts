import { GuildJoinInfo } from '@/types/model/guilds/join'
import {
  GuildUserAtAdminDetail,
  GuildUserAtAdminUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'
import { GuildBlackInfo } from '@/types/model/guilds/blackList'
import { GuildRole } from '@/types/model/guilds/role'

export interface GuildAdminUserState {
  userList: Array<GuildUserAtAdminUserList>
  userFilterOption: GuildUserSelectListQuery
  joinForms: Array<GuildJoinInfo>
  blackList: Array<GuildBlackInfo>
  userDetail: GuildUserAtAdminDetail
  roleList: Array<GuildRole>
}

export const guildAdminUserState: GuildAdminUserState = {
  userList: [],
  userFilterOption: {} as GuildUserSelectListQuery,
  joinForms: [],
  blackList: [],
  userDetail: {} as GuildUserAtAdminDetail,
  roleList: [],
}
