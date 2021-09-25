import {
  DEFAULT_USER_SELECT_LIST_QUERY_LIMIT,
  GuildUserAtUserList,
  GuildUserSelectListQuery
} from '@/types/model/auth/user/user'

export interface GuildUserState {
  userList: Array<GuildUserAtUserList>
  totalUserList: number
  userFilterOption: GuildUserSelectListQuery
}

export const guildUserState: GuildUserState = {
  userList: [],
  totalUserList: 0,
  userFilterOption: {
    limit: DEFAULT_USER_SELECT_LIST_QUERY_LIMIT,
  } as GuildUserSelectListQuery,
}
