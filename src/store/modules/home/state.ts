import { DEFAULT_GUILD_LIST_FILTER_LIMIT, GuildInDropdown, GuildInfo, GuildListFilterQuery } from '@/types/model/guilds'

export interface HomeState {
  guildListFilterOption: GuildListFilterQuery
  totalGuildList: number
  guildList: Array<GuildInDropdown>
  guildListLoading: boolean
  guildInfo: GuildInfo
}

export const homeState: HomeState = {
  guildListFilterOption: {
    limit: DEFAULT_GUILD_LIST_FILTER_LIMIT,
  } as GuildListFilterQuery,
  totalGuildList: 0,
  guildList: [],
  guildListLoading: false,
  guildInfo: {} as GuildInfo,
}
