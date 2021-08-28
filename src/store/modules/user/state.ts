import { GuildUserInfo, User } from '@/types/model/auth/user/user'
import { Guild, GuildInDropdown } from '@/types/model/guilds'

export interface UserState extends User {
  // @TODO: 타입 지정해주기
  notifications: Array<any>
  guildList: Array<GuildInDropdown>
}

export const userState: UserState = {
  uid: '',
  email: '',
  name: '',
  nickname: '',
  color: '',
  img: '',
  auth: 'staff',
  notifications: [],
  guildList: [],
  createdAt: '',
  updatedAt: '',
}
