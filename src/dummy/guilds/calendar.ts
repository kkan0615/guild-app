import { GuildCalendar, GuildCalendarTask } from '@/types/model/guilds/calendar'
import { v4 } from 'uuid'
import { lightTextBgColors } from '@/data/color'
import * as faker from 'faker'
import dayjs from 'dayjs'

// eslint-disable-next-line
export let dummyGuildCalendars: Array<GuildCalendar> = []

// eslint-disable-next-line
export let dummyGuildCalendarTasks: Array<GuildCalendarTask> = []

export const initDummyGuildCalendars = () => {
  dummyGuildCalendars = [...Array(12).keys()].map(() => {
    const color = lightTextBgColors[Math.floor(Math.random() * lightTextBgColors.length)]

    const isGuildCalendar =  Math.floor(Math.random() * 2)

    return {
      id: v4(),
      guildId: 'test-id',
      color,
      name: faker.name.title(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      isGuild: isGuildCalendar !== 0,
      userId: isGuildCalendar === 0 ? 'test-id-guild-user' : undefined,
      isShare: isGuildCalendar === 0,
    } as GuildCalendar
  })
}
