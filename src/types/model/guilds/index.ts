import { FirebaseAttributes } from '@/types/model/attributes'
import { User } from '@/types/model/auth/user'

export interface Guild extends FirebaseAttributes {
  img: string
  name: string
  mainManger: Array<User>
}

export type GuildInDropdown = Pick<Guild, 'uid' | 'img' | 'name'>
