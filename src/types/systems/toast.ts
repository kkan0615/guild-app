import { CustomDate } from '@/types/systems/date'

export type ToastType = 'info' | 'success' | 'warn' | 'danger' | string

/**
 *
 * content
 * type
 * title
 * createdAt
 * afterClose
 */
export interface Toast {
  content: string
  type?: ToastType
  title?: string
  createdAt?: CustomDate
  afterClose?: () => void
}
