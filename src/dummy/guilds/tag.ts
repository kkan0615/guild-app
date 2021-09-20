import { GuildTag } from '@/types/model/guilds/tag'
import { v4 } from 'uuid'
import faker from 'faker'
import dayjs from 'dayjs'

export let dummyGuildTags: Array<GuildTag> = []
export const initDummyGuildTags = () => {
  dummyGuildTags = [...Array(50).keys()].map(() => {
    return {
      id: v4(),
      name: faker.lorem.word(),
      color: faker.commerce.color(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })
}
