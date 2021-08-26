import { CustomDate } from '@/types/systems/date'

export interface FirebaseAttributes {
  uid: string
  createdAt: CustomDate
  updatedAt: CustomDate
  deletedAt?: CustomDate
}

export interface SelectListFilterQuery {
  createdAtFrom?: any
  createdAtto?: any
}
