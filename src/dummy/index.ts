import { initDummyUsers } from '@/dummy/user'
import { initDummyGuilds } from '@/dummy/guilds'
import { initDummyGuildTags } from '@/dummy/guilds/tag'
import { initDummyGuildCalendars } from '@/dummy/guilds/calendar'

export const initDummyData = () => {
  initDummyUsers()
  initDummyGuildTags()
  initDummyGuilds()
  initDummyGuildCalendars()
}
