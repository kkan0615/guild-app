import { GuildNotice } from '@/types/model/guilds/notice'

export interface GuildNoticeState {
  noticeList: Array<GuildNotice>
}

export const guildNoticeState: GuildNoticeState = {
  noticeList: [],
}
