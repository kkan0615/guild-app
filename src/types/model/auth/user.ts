import { FirebaseAttributes } from '@/types/model/attributes'

export type UserSystemAuth = 'superAdmin' | 'admin' | 'staff'

export interface User extends FirebaseAttributes {
  email: string
  name: string
  nickname: string
  color: string
  img: string
  auth: UserSystemAuth
}

export interface UserLoginForm {
  email: string
  password: string
}
