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

export let dummyGuilds: Array<Guild> = []

export const initDummyGuilds = () => {
  dummyGuilds = [...Array(50).keys()].map((num) => {
    const guildUid = v4()

    const roles: Array<GuildRole> = [...Array(15).keys()].map((num) => {
      const role = {
        uid: v4(),
        guildId: guildUid,
        name: faker.lorem.word(),
        default: false,
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
      if (members.findIndex(member => member.userId === dummyGuildUser.uid) !== -1)
        continue
      const role = roles[Math.floor(Math.random() * roles.length)]

      const result = {
        ...dummyGuildUser,
        uid: v4(),
        userId: dummyGuildUser.uid,
        roleId: role.uid,
        role,
        guildId: guildUid,
        notifications: [...Array(50).keys()].map(() => {
          return {
            uid: v4(),
            guildId: 'test-uid',
            type: 'success',
            targetUserId: dummyGuildUser.uid,
            sendUserId: dummyGuildUser.uid,
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
      uid: guildUid,
      img: faker.image.city(),
      logoImg: faker.image.nature(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.uid),
      mainMangerId: members[0].uid,
      description: faker.lorem.paragraphs(),
      introduction: faker.lorem.lines(),
      memberIds: members.map((member) => member.uid),
      roleIds: roles.map(role => role.uid),
      isRequirePermission: false,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })

  const roles: Array<GuildRole> = [...Array(15).keys()].map((num) => {
    const role = {
      uid: v4(),
      guildId: 'test-uid',
      name: faker.lorem.word(),
      default: false,
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
    if (members.findIndex(member => member.userId === dummyUser.uid) !== -1)
      continue
    if (dummyUser.nickname === 'Super Admin')
      continue
    const role = roles[Math.floor(Math.random() * roles.length)]

    const result = {
      ...dummyUser,
      uid: v4(),
      userId: dummyUser.uid,
      role,
      roleId: role.uid,
      guildId: 'test-uid',
      notifications: [...Array(50).keys()].map(() => {
        return {
          uid: v4(),
          guildId: 'test-uid',
          type: 'success',
          targetUserId: dummyUser.uid,
          sendUserId: dummyUser.uid,
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
    const dummyGuildUser = {
      ...admin,
      uid: 'test-uid-guild-user',
      roleId: role.uid,
      role,
      guildId: 'test-uid',
      notifications: [...Array(50).keys()].map(() => {
        return {
          uid: v4(),
          guildId: 'test-uid',
          type: 'success',
          targetUserId: admin.uid,
          sendUserId: admin.uid,
          title: faker.lorem.sentence(),
          content: faker.lorem.sentence(),
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        } as Notification
      }),
      userId: admin.uid,
    }
    dummyGuildUsers.unshift(dummyGuildUser)
    members.unshift(dummyGuildUser)

    const joinQuestions = [...Array(5).keys()].map(num => {
      return {
        question: faker.lorem.words(),
        index: num,
      }
    })

    dummyGuildJoins.unshift({
      uid: v4(),
      guildId: 'test-uid',
      userId: admin.uid,
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
      uid: 'test-uid',
      img: faker.image.city(),
      logoImg: faker.image.nature(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.uid),
      mainMangerId: dummyGuildUser.uid,
      description: faker.lorem.paragraphs(),
      introduction: faker.lorem.lines(),
      memberIds: members.map((member) => member.uid).concat([admin.uid]),
      roleIds: roles.map(role => role.uid),
      isRequirePermission: true,
      joinQuestions,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    })
  }
}
