import { User } from '@/types/model/auth/user'
import { v4 } from 'uuid'
import * as faker from 'faker'

export let dummyUsers:Array<User> = []

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
    uid: v4(),
    nickname: 'Super Admin',
    auth: 'superAdmin',
    name: 'Super Admin',
    color: faker.internet.color(),
    img: 'https://octodex.github.com/images/saketocat.png',
    email: 'admin@admin.com'
  })
}
