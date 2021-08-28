import { GuildInfo } from '@/types/model/guilds'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { dummyGuildUsers, dummyUsers } from '@/dummy/user'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { GuildRole } from '@/types/model/guilds/role'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import dayjs from 'dayjs'
import { Notification } from '@/types/systems/notification'

export let dummyGuilds: Array<GuildInfo> = []

export const initDummyGuilds = () => {
  dummyGuilds = [...Array(50).keys()].map((num) => {
    const guildUid = v4()

    const roles: Array<GuildRole> = [...Array(50).keys()].map((num) => {
      return {
        uid: v4(),
        name: faker.lorem.word(),
        default: false,
        color: faker.commerce.color(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      }
    })

    const members = Array.from(new Set([...Array(30).keys()].map(() => {
      const dummyGuildUser = dummyGuildUsers[Math.floor(Math.random() * dummyGuildUsers.length)]
      const role = roles[Math.floor(Math.random() * roles.length)]
      dummyGuildUser.guildId = guildUid
      dummyGuildUser.role = role

      dummyGuildUser.notifications = [...Array(50).keys()].map(() => {
        return {
          uid: v4(),
          guildId: guildUid,
          type: 'success',
          targetUserId: dummyGuildUser.uid,
          sendUserId: dummyGuildUser.uid,
          title: faker.lorem.sentence(),
          content: faker.lorem.sentence(),
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        } as Notification
      })

      return {
        ...dummyGuildUser,
        role,
        guildId: guildUid,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      } as GuildUserInfo
    })))

    const tags = Array.from(new Set([...Array(30).keys()].map(() => {
      return  dummyGuildTags[Math.floor(Math.random() * dummyGuildTags.length)]
    })))

    return {
      uid: guildUid,
      // img: 'https://octodex.github.com/images/saketocat.png',
      img: faker.image.city(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.uid),
      tags: tags,
      mainManger: members[0],
      mainMangerId: v4(),
      description: faker.lorem.lines(),
      members: members,
      memberIds: members.map((member) => member.uid),
      roles: roles,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    }
  })


  /* Test first */
  const guildUid = v4()

  const roles: Array<GuildRole> = [...Array(30).keys()].map((num) => {
    return {
      uid: v4(),
      name: faker.lorem.word(),
      default: false,
      color: 'blue',
      createdAt: dayjs(),
      updatedAt: dayjs(),
    }
  })

  const members = Array.from(new Set([...Array(30).keys()].map(() => {
    const dummyGuildUser = dummyGuildUsers[Math.floor(Math.random() * dummyGuildUsers.length)]
    const role = roles[Math.floor(Math.random() * roles.length)]
    dummyGuildUser.guildId = guildUid
    dummyGuildUser.role = role

    dummyGuildUser.notifications = [...Array(50).keys()].map(() => {
      return {
        uid: v4(),
        guildId: guildUid,
        type: 'success',
        targetUserId: dummyGuildUser.uid,
        sendUserId: dummyGuildUser.uid,
        title: faker.lorem.sentence(),
        content: faker.lorem.sentence(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      } as Notification
    })

    return {
      ...dummyGuildUser,
      role,
      createdAt: dayjs(),
      updatedAt: dayjs(),
    } as GuildUserInfo
  })))

  const admin = dummyUsers.find(du => du.auth === 'superAdmin')
  const tags = Array.from(new Set([...Array(30).keys()].map(() => {
    return  dummyGuildTags[Math.floor(Math.random() * dummyGuildTags.length)]
  })))
  if (admin)
    dummyGuilds.unshift({
      uid: 'test-uid',
      // img: 'https://octodex.github.com/images/saketocat.png',
      img: faker.image.city(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.uid),
      tags: tags,
      mainManger: members[0],
      mainMangerId: v4(),
      description: faker.lorem.lines(),
      members: members.concat([{ ...admin, role: roles[0] } as GuildUserInfo]),
      memberIds: members.map((member) => member.uid).concat([admin.uid]),
      roles: roles,
      createdAt: dayjs(),
      updatedAt: dayjs(),
    })
}
