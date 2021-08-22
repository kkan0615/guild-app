import { initDummyUsers } from '@/dummy/user'
import { initDummyGuilds } from '@/dummy/guilds'
import { initDummyGuildTags } from '@/dummy/guilds/tag'

export const initDummyData = () => {
  initDummyUsers()
  initDummyGuildTags()
  initDummyGuilds()
}
