import { GuildTag } from '@/types/model/guilds/tag'
import { v4 } from 'uuid'
import faker from 'faker'

export let dummyGuildTags: Array<GuildTag> = []
export const initDummyGuildTags = () => {
  dummyGuildTags = [...Array(50).keys()].map((num) => {
    return {
      uid: v4(),
      name: faker.lorem.word(),
      color: faker.commerce.color(),
    }
  })
}
