import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildCalendarLayout from '@/layouts/views/guilds/generals/Calendar/index.vue'

export const calendarGuildRoutes: Array<RouteRecordRaw> = [
  {
    path: 'calendar',
    name: RouterNameEnum.GUILD_CALENDAR_LAYOUT,
    component: GuildCalendarLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_CALENDAR_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_CALENDAR_MAIN,
        component: () => import('@/views/guilds/generals/calendars/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/new',
        name: RouterNameEnum.GUILD_CALENDAR_CREATE_FORM,
        component: () => import('@/views/guilds/generals/calendars/CalendarForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/id/:id',
        name: RouterNameEnum.GUILD_CALENDAR_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/calendars/CalendarForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
