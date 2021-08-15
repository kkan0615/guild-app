import { User } from '@/types/model/auth/user'

export interface UserState extends User {
  // @TODO: 타입 지정해주기
  notifications: Array<any>
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
}
