import { GuildInfo } from '@/types/model/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'

export interface GuildState {
  guildInfo: GuildInfo
  guildUserInfo: GuildUserInfo
}

export const guildState: GuildState = {
  guildInfo: {} as GuildInfo,
  guildUserInfo: {} as GuildUserInfo
}
