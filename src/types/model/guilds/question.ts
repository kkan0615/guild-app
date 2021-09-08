export interface GuildJoinQuestion {
  question: string
  answer?: string
  index?: number
}

export type GuildJoinQuestionFormStatus = 'CREATE' | 'UPDATE' | 'DELETE'

export type GuildJoinQuestionForm = Pick<GuildJoinQuestion, 'question' | 'index'> & {
  key: number
  status: GuildJoinQuestionFormStatus
}
