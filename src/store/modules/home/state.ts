import { GuildInfo, GuildListFilterQuery } from '@/types/model/guilds'

export interface HomeState {
  guildListFilterOption: GuildListFilterQuery
  guildList: Array<GuildInfo>
  guildListLoading: boolean
  guildInfo: GuildInfo
}

export const homeState: HomeState = {
  guildListFilterOption: {} as GuildListFilterQuery,
  guildList: [],
  guildListLoading: false,
  guildInfo: {} as GuildInfo,
}
