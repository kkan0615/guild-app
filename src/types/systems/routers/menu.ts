import { RouterNameEnum } from '@/types/systems/routers/keys'

export interface Menu {
  id: string
  icon?: string
  title?: string
  name?: RouterNameEnum
  index?: number
  children?: Menu[]
  activeCondition: () => boolean
}
