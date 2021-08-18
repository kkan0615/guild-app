import { GuildInfo, GuildListFilterQuery } from '@/types/model/guilds'

export interface HomeState {
  guildListFilterOption: GuildListFilterQuery
  guildList: Array<GuildInfo>
}

export const homeState: HomeState = {
  guildListFilterOption: {} as GuildListFilterQuery,
  guildList: [],
}
