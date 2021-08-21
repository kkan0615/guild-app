import { initDummyUsers } from '@/dummy/user'
import { initGuilds } from '@/dummy/guilds'

export const initDummyData = () => {
  initDummyUsers()
  initGuilds()
}
