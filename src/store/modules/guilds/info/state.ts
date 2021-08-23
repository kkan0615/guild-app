import { GuildInfo } from '@/types/model/guilds'

export interface GuildState {
  guildInfo: GuildInfo
}

export const guildState: GuildState = {
  guildInfo: {} as GuildInfo,
}
