import {
  GuildUserAtUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'

export interface GuildUserState {
  userList: Array<GuildUserAtUserList>
  userFilterOption: GuildUserSelectListQuery
}

export const guildUserState: GuildUserState = {
  userList: [],
  userFilterOption: {} as GuildUserSelectListQuery,
}
