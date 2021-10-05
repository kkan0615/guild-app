import { initDummyUsers } from '@/dummy/user'
import { initDummyGuilds } from '@/dummy/guilds'
import { initDummyGuildTags } from '@/dummy/guilds/tag'
import { initDummyGuildCalendars } from '@/dummy/guilds/calendar'
import { initDummyGuildNotices } from '@/dummy/guilds/notice'
import { initDummyGuildPostBoardGroups } from '@/dummy/guilds/post'

export const initDummyData = () => {
  initDummyUsers()
  initDummyGuildTags()
  initDummyGuilds()
  initDummyGuildCalendars()
  initDummyGuildNotices()
  initDummyGuildPostBoardGroups()
}
