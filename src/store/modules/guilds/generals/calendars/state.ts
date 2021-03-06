import { GuildCalendar, GuildCalendarAtCalendar } from '@/types/model/guilds/calendar'
import TuiCalendar from 'tui-calendar'

export interface GuildCalendarState {
  isOpenSidebar: boolean
  myCalendarList: Array<GuildCalendarAtCalendar>
  guildCalendarList: Array<GuildCalendarAtCalendar>
  otherCalendarList: Array<GuildCalendarAtCalendar>
  tuiCalendar: TuiCalendar | null
  prevClickedCellAtTuiCalendar: any // previous clicked cell
  targetCalendar: GuildCalendar
}

export const guildCalendarState: GuildCalendarState = {
  isOpenSidebar: true,
  myCalendarList: [],
  guildCalendarList: [],
  otherCalendarList: [],
  tuiCalendar: null,
  prevClickedCellAtTuiCalendar: null,
  targetCalendar: {} as GuildCalendar
}
