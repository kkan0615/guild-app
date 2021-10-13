import { GuildNotice } from '@/types/model/guilds/notice'
import { GuildPost, GuildPostBoard, GuildPostBoardGroup } from '@/types/model/guilds/post'
import { lightTextBgColors } from '@/data/color'
import { v4 } from 'uuid'
import faker from 'faker'
import dayjs from 'dayjs'
import { dummyGuildUsers } from '@/dummy/user'

// eslint-disable-next-line
export let dummyGuildPostBoardGroups: Array<GuildPostBoardGroup> = []

// eslint-disable-next-line
export let dummyGuildPostBoards: Array<GuildPostBoard> = []

// eslint-disable-next-line
export let dummyGuildPosts: Array<GuildPost> = []

export const initDummyGuildPostBoardGroups = () => {
  const testIdGuildUsers = dummyGuildUsers.filter(dgu => dgu.guildId === 'test-id')
  dummyGuildPostBoardGroups = [...Array(2).keys()].map(() => {
    const guildPostBoardGroupId = v4()

    dummyGuildPostBoards = dummyGuildPostBoards.concat([...Array(3).keys()].map(() => {
      const dummyGuildPostBoardId = v4()

      dummyGuildPosts = dummyGuildPosts.concat([...Array(30).keys()].map(() => {
        return {
          id:v4(),
          guildId: 'test-id',
          postBoardId: dummyGuildPostBoardId,
          title: faker.name.title(),
          content: faker.lorem.paragraphs(),
          isNotice: false,
          creatorId: 'test-id-guild-user',
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        }
      }))

      return {
        id: dummyGuildPostBoardId,
        guildId: 'test-id',
        postBoardGroupId: guildPostBoardGroupId,
        name: faker.name.title(),
        description: faker.lorem.lines(),
        isGuild: false,
        setting: {
          isAllowComment: true,
          isPrivate: false,
          operatorIds: testIdGuildUsers.map(user => user.id),
        },
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      }
    }))

    return {
      id: guildPostBoardGroupId,
      guildId: 'test-id',
      name: faker.name.title(),
      description: faker.lorem.lines(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })

  dummyGuildPostBoardGroups = dummyGuildPostBoardGroups.concat([{
    id: 'test-guild-post-board-groups-id',
    guildId: 'test-id',
    name: faker.name.title(),
    description: faker.lorem.lines(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  }])

  dummyGuildPostBoards = dummyGuildPostBoards.concat({
    id: 'test-guild-post-board-id',
    guildId: 'test-id',
    postBoardGroupId: 'test-guild-post-board-groups-id',
    name: faker.name.title(),
    description: faker.lorem.lines(),
    isGuild: false,
    setting: {
      isAllowComment: true,
      isPrivate: false,
      operatorIds: testIdGuildUsers.map(user => user.id),
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  })

  dummyGuildPosts = dummyGuildPosts.concat([...Array(30).keys()].map(() => {
    return {
      id: v4(),
      guildId: 'test-id',
      postBoardId: 'test-guild-post-board-id',
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(),
      isNotice: false,
      creatorId: 'test-id-guild-user',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  }))

  dummyGuildPosts = dummyGuildPosts.concat([...Array(5).keys()].map(() => {
    return {
      id: v4(),
      guildId: 'test-id',
      postBoardId: 'test-guild-post-board-id',
      title: faker.lorem.word(),
      content: faker.lorem.paragraphs(),
      isNotice: true,
      creatorId: 'test-id-guild-user',
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  }))
}
