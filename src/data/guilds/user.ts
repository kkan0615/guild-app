import { GuildUserState } from '@/types/model/auth/user/user'

export const guildUserStatesData: Array<GuildUserState> = [
  'ONLINE',
  'IDLE',
  'DO_NOT_DISTURB',
  'INVISIBLE',
  'OFFLINE',
]

export const guildUserStateColorsData: Record<GuildUserState, string> = {
  'ONLINE': 'green-500',
  'IDLE': 'yellow-500',
  'DO_NOT_DISTURB': 'red-500',
  'INVISIBLE': 'gray-100',
  'OFFLINE': 'gray-200',
}
