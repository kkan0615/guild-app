import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { GuildRole } from '@/types/model/guilds/role'

export let dummyUsers:Array<User> = []
export let dummyGuildUsers:Array<GuildUserInfo> = []

export const initDummyUsers = () => {
  dummyUsers = [...Array(30).keys()].map(() => {
    return {
      uid: v4(),
      nickname: faker.internet.userName(),
      auth: 'staff',
      name: faker.internet.userName(),
      color: faker.internet.color(),
      img: faker.internet.avatar(),
      email: faker.internet.email()
    }
  })
  dummyUsers.unshift({
    uid: 'admin-uid',
    nickname: 'Super Admin',
    auth: 'superAdmin',
    name: 'Super Admin',
    color: faker.internet.color(),
    img: 'https://octodex.github.com/images/saketocat.png',
    email: 'admin@admin.com',
  })

  dummyGuildUsers = dummyUsers.map(du => {
    return {
      ...du,
      role: {} as GuildRole,
      userId: du.uid,
      guildId: '',
      uid: v4()
    }
  })
}
