import { GuildInfo } from '@/types/model/guilds'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { NotificationInfo } from '@/types/systems/notification'

export interface GuildState {
  guildInfo: GuildInfo
  guildUserInfo: GuildUserInfo
  userNotificationList: Array<NotificationInfo>
  isOpenSideBar: boolean
}

export const guildState: GuildState = {
  guildInfo: {} as GuildInfo,
  guildUserInfo: {} as GuildUserInfo,
  userNotificationList: [],
  isOpenSideBar: true,
}
