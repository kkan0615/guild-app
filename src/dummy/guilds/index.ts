import { GuildInfo } from '@/types/model/guilds'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { dummyUsers } from '@/dummy/user'

export let dummyGuilds: Array<GuildInfo> = []

export const initGuilds = () => {
  dummyGuilds = [...Array(50).keys()].map((num) => {
    const members = Array.from(new Set([...Array(50).keys()].map(() => {
      return dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
    })))

    return {
      uid: v4(),
      // img: 'https://octodex.github.com/images/saketocat.png',
      img: faker.image.city(),
      name: faker.company.companyName(),
      tagIds: [],
      tags: [],
      mainManger: members[0],
      mainMangerId: v4(),
      description: 'This is test data',
      members: members,
      memberIds: members.map((member) => member.uid),
    }
  })
  const members = Array.from(new Set([...Array(50).keys()].map(() => {
    return dummyUsers[Math.floor(Math.random() * dummyUsers.length)]
  })))
  dummyGuilds.unshift({
    uid: 'test-uid',
    // img: 'https://octodex.github.com/images/saketocat.png',
    img: faker.image.city(),
    name: faker.company.companyName(),
    tagIds: [],
    tags: [],
    mainManger: members[0],
    mainMangerId: v4(),
    description: 'This is test data',
    members: members,
    memberIds: members.map((member) => member.uid),

  })
}
