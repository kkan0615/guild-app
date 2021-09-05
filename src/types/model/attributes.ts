import { CustomDate } from '@/types/systems/date'

export interface FirebaseAttributes {
  uid: string
  createdAt: CustomDate
  updatedAt: CustomDate
  deletedAt?: CustomDate
}

export interface SelectListFilterQuery {
  offset?: number
  limit?: number
  createdAtFrom?: CustomDate
  createdAtTo?: CustomDate
}
