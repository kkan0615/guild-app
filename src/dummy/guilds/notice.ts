import { GuildNotice } from '@/types/model/guilds/notice'
import { v4 } from 'uuid'
import faker from 'faker'
import dayjs from 'dayjs'
import { lightTextBgColors } from '@/data/color'

// eslint-disable-next-line
export let dummyGuildNotices: Array<GuildNotice> = []

export const initDummyGuildNotices = () => {
  dummyGuildNotices = [...Array(30).keys()].map(() => {
    const color = lightTextBgColors[Math.floor(Math.random() * lightTextBgColors.length)]

    const cols = Math.floor(Math.random() * 10) + 2
    console.log(cols)
    return {
      id: v4(),
      guildId: 'test-id',
      title: faker.name.title(),
      content: faker.lorem.paragraphs(),
      color,
      cols: Math.floor(Math.random() * 10) + 2,
      endDate: dayjs().add(1, 'day').toISOString(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })
}
