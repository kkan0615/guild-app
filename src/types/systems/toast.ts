import { CustomDate } from '@/types/systems/date'

export type ToastType = 'info' | 'success' | 'warning' | 'danger' | string

/**
 *
 * content
 * type
 * title
 * createdAt
 * afterClose
 */
export interface Toast {
  id: string
  content: string
  type?: ToastType
  title?: string
  createdAt?: CustomDate
  afterClose?: () => void
}
