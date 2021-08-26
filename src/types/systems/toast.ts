import { CustomDate } from '@/types/systems/date'

export interface Toast {
  content: string
  type: string
  title?: string
  createdAt: CustomDate
}
