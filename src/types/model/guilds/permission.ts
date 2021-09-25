import { FirebaseAttributes } from '@/types/model/attributes'

export type GuildUserPermissionModuleType =
  'ADMIN_GUILD' |
  'ADMIN_USER' |
  'ADMIN_ROLE' |
  'ADMIN_CALENDAR' |
  'GENERAL_USER' |
  'GENERAL_CALENDAR'

export interface GuildUserPermission extends FirebaseAttributes {
  userId: string
  module: string
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}
