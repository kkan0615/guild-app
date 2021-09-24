import { GuildCalendar, GuildCalendarTask } from '@/types/model/guilds/calendar'
import { v4 } from 'uuid'
import { lightTextBgColors } from '@/data/color'
import * as faker from 'faker'
import dayjs from 'dayjs'
import { dummyGuildUsers } from '@/dummy/user'

// eslint-disable-next-line
export let dummyGuildCalendars: Array<GuildCalendar> = []

// eslint-disable-next-line
export let dummyGuildCalendarTasks: Array<GuildCalendarTask> = []

export const initDummyGuildCalendars = () => {
  const testIdGuildUsers = dummyGuildUsers.filter(dgu => dgu.guildId === 'test-id')
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
      targets: isGuildCalendar === 1 ? testIdGuildUsers.map(guildUser => guildUser.id) : [] as Array<string>,
    } as GuildCalendar
  })

  dummyGuildCalendars = dummyGuildCalendars.concat([...Array(7).keys()].map(() => {
    const color = lightTextBgColors[Math.floor(Math.random() * lightTextBgColors.length)]

    return {
      id: v4(),
      guildId: 'test-id',
      color,
      name: faker.name.title(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      isGuild: false,
      userId: testIdGuildUsers[Math.floor(Math.random() * testIdGuildUsers.length)].id,
      targets: ['test-id-guild-user'],
    } as GuildCalendar
  }))
}
