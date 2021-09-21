import { Guild } from '@/types/model/guilds'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { dummyGuildUsers, dummyUsers } from '@/dummy/user'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { GuildRole } from '@/types/model/guilds/role'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import dayjs from 'dayjs'
import { Notification } from '@/types/systems/notification'
import { dummyGuildRoles } from '@/dummy/guilds/role'
import { dummyGuildJoins } from '@/dummy/guilds/joins'
import { tailwindDefaultColors } from '@/data/color'
import { guildUserStatesData } from '@/data/guilds/user'

export let dummyGuilds: Array<Guild> = []

export const initDummyGuilds = () => {
  dummyGuilds = [...Array(50).keys()].map((num) => {
    const guildId = v4()

    const roles: Array<GuildRole> = [...Array(15).keys()].map((num) => {
      const role = {
        id: v4(),
        guildId: guildId,
        name: faker.lorem.word(),
        default: num === 0,
        color: tailwindDefaultColors[Math.floor(Math.random() * tailwindDefaultColors.length)],
        index: num,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      } as GuildRole

      dummyGuildRoles.push(role)
      return role
    })

    const members: Array<GuildUserInfo> = []
    for (let i = 0; i < 50; i++) {
      const dummyGuildUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
      if (members.findIndex(member => member.userId === dummyGuildUser.id) !== -1)
        continue
      const role = roles[Math.floor(Math.random() * roles.length)]

      const result = {
        ...dummyGuildUser,
        id: v4(),
        userId: dummyGuildUser.id,
        roleId: role.id,
        role,
        guildId: guildId,
        state: guildUserStatesData[Math.floor(Math.random() * guildUserStatesData.length)],
        notifications: [...Array(50).keys()].map(() => {
          return {
            id: v4(),
            guildId: guildId,
            type: 'success',
            targetUserId: dummyGuildUser.id,
            sendUserId: dummyGuildUser.id,
            title: faker.lorem.sentence(),
            content: faker.lorem.sentence(),
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          } as Notification
        }),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      } as GuildUserInfo

      dummyGuildUsers.push(result)
      members.push(result)
    }

    const tags = Array.from(new Set([...Array(30).keys()].map(() => {
      return  dummyGuildTags[Math.floor(Math.random() * dummyGuildTags.length)]
    })))

    return {
      id: guildId,
      img: faker.image.city(),
      logoImg: faker.image.nature(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.id),
      mainMangerId: members[0].id,
      description: faker.lorem.paragraphs(),
      introduction: faker.lorem.lines(),
      memberIds: members.map((member) => member.userId),
      roleIds: roles.map(role => role.id),
      isRequirePermission: false,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })

  /* test - id guild */

  const roles: Array<GuildRole> = [...Array(15).keys()].map((num) => {
    const role = {
      id: v4(),
      guildId: 'test-id',
      name: faker.lorem.word(),
      default: num === 0,
      color: tailwindDefaultColors[Math.floor(Math.random() * tailwindDefaultColors.length)],
      index: num,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildRole

    dummyGuildRoles.push(role)
    return role
  })

  const members: Array<GuildUserInfo> = []
  for (let i = 0; i < 50; i++) {
    const dummyUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
    if (members.findIndex(member => member.userId === dummyUser.id) !== -1)
      continue
    if (dummyUser.nickname === 'Super Admin')
      continue
    const role = roles[Math.floor(Math.random() * roles.length)]

    const result = {
      ...dummyUser,
      id: v4(),
      userId: dummyUser.id,
      role,
      roleId: role.id,
      guildId: 'test-id',
      state: guildUserStatesData[Math.floor(Math.random() * guildUserStatesData.length)],
      notifications: [...Array(50).keys()].map(() => {
        return {
          id: v4(),
          guildId: 'test-id',
          type: 'success',
          targetUserId: dummyUser.id,
          sendUserId: dummyUser.id,
          title: faker.lorem.sentence(),
          content: faker.lorem.sentence(),
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        } as Notification
      }),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    } as GuildUserInfo

    dummyGuildUsers.push(result)
    members.push(result)
  }

  const admin = dummyUsers.find(du => du.auth === 'superAdmin')
  const tags = Array.from(new Set([...Array(30).keys()].map(() => {
    return  dummyGuildTags[Math.floor(Math.random() * dummyGuildTags.length)]
  })))

  if (admin) {
    const role = roles[Math.floor(Math.random() * roles.length)]
    const dummyAdminGuildUser = {
      ...admin,
      id: 'test-id-guild-user',
      roleId: role.id,
      role,
      guildId: 'test-id',
      state: 'OFFLINE',
      notifications: [...Array(50).keys()].map(() => {
        return {
          id: v4(),
          guildId: 'test-id',
          type: 'success',
          targetUserId: admin.id,
          sendUserId: admin.id,
          title: faker.lorem.sentence(),
          content: faker.lorem.sentence(),
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        } as Notification
      }),
      userId: admin.id,
    } as GuildUserInfo

    dummyGuildUsers.unshift(dummyAdminGuildUser)
    members.unshift(dummyAdminGuildUser)

    const joinQuestions = [...Array(5).keys()].map(num => {
      return {
        question: faker.lorem.words(),
        index: num,
      }
    })

    dummyGuildJoins.unshift({
      id: v4(),
      guildId: 'test-id',
      userId: admin.id,
      nickname: admin.nickname,
      guildQuestions: joinQuestions.map(jq => {
        return {
          ...jq,
          answer: faker.lorem.words()
        }
      }),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })

    dummyGuilds.unshift({
      id: 'test-id',
      img: faker.image.city(),
      logoImg: faker.image.nature(),
      name: 'Test guild name',
      tagIds: tags.map(tag => tag.id),
      mainMangerId: dummyAdminGuildUser.id,
      description: faker.lorem.paragraphs(),
      introduction: faker.lorem.lines(),
      memberIds: members.map((member) => member.id),
      roleIds: roles.map(role => role.id),
      isRequirePermission: true,
      joinQuestions,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })
  }
}
