import { GuildNotice } from '@/types/model/guilds/notice'

export interface GuildAppState {
  noticeList: Array<GuildNotice>
}

export const guildAppState: GuildAppState = {
  noticeList: [],
}
