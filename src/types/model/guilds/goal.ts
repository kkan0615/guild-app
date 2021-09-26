import { FirebaseAttributes } from '@/types/model/attributes'
import { CustomDate } from '@/types/systems/date'

export type GuildGoalStatus = 'READY' | 'PROCESS' | 'DONE'

export interface GuildGoalTask {
  content: string
  isDone: boolean
}

export interface GuildGoal extends FirebaseAttributes {
  title: string
  content: string
  endDate?: CustomDate // if it's undefined, infinite
  status: GuildGoalStatus
  Tasks: Array<GuildGoalTask>
}
