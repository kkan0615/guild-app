import { GuildInfo } from '@/types/model/guilds'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { dummyUsers } from '@/dummy/user'
import { GuildUserInfo } from '@/types/model/auth/user/user'
import { GuildRole } from '@/types/model/guilds/role'
import { dummyGuildTags } from '@/dummy/guilds/tag'
import { GuildTag } from '@/types/model/guilds/tag'

export let dummyGuilds: Array<GuildInfo> = []

export const initDummyGuilds = () => {
  dummyGuilds = [...Array(50).keys()].map((num) => {
    const roles: Array<GuildRole> = [...Array(50).keys()].map((num) => {
      return {
        uid: v4(),
        name: faker.lorem.word(),
        default: false,
        color: faker.commerce.color(),
      }
    })

    const members = Array.from(new Set([...Array(50).keys()].map(() => {
      const dummyUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
      return {
        ...dummyUser,
        role: roles[Math.floor(Math.random() * roles.length)]
      } as GuildUserInfo
    })))

    const tags = Array.from(new Set([...Array(50).keys()].map(() => {
      return  dummyGuildTags[Math.floor(Math.random() * dummyGuildTags.length)]
    })))

    return {
      uid: v4(),
      // img: 'https://octodex.github.com/images/saketocat.png',
      img: faker.image.city(),
      name: faker.company.companyName(),
      tagIds: tags.map(tag => tag.uid),
      tags: tags,
      mainManger: members[0],
      mainMangerId: v4(),
      description: 'This is test data',
      members: members,
      memberIds: members.map((member) => member.uid),
      roles: roles,
    }
  })

  const roles: Array<GuildRole> = [...Array(50).keys()].map((num) => {
    return {
      uid: v4(),
      name: faker.lorem.word(),
      default: false,
      color: 'blue',
    }
  })

  const members = Array.from(new Set([...Array(50).keys()].map(() => {
    const dummyUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
    return {
      ...dummyUser,
      role: roles[Math.floor(Math.random() * roles.length)]
    } as GuildUserInfo
  })))

  const admin = dummyUsers.find(du => du.auth === 'superAdmin')
  const tags = Array.from(new Set([...Array(50).keys()].map(() => {
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
      description: 'This is test data',
      members: members.concat([{ ...admin, role: roles[0] } as GuildUserInfo]),
      memberIds: members.map((member) => member.uid).concat([admin.uid]),
      roles: roles,
    })
}
