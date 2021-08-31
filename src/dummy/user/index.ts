import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { v4 } from 'uuid'
import * as faker from 'faker'
import { GuildRole } from '@/types/model/guilds/role'
import dayjs from 'dayjs'

export let dummyUsers:Array<User> = []
export const dummyGuildUsers:Array<GuildUserInfo> = []

export const initDummyUsers = () => {
  dummyUsers = [...Array(30).keys()].map(() => {
    return {
      uid: v4(),
      nickname: faker.internet.userName(),
      auth: 'staff',
      name: faker.internet.userName(),
      color: faker.internet.color(),
      img: faker.internet.avatar(),
      email: faker.internet.email(),
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
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
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  })

  // dummyGuildUsers = dummyUsers.map(du => {
  //   return {
  //     ...du,
  //     roleId: '',
  //     role: {} as GuildRole,
  //     userId: du.uid,
  //     guildId: '',
  //     uid: v4(),
  //     notifications: [],
  //   }
  // })
}
