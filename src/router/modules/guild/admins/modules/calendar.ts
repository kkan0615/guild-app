import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildAdminCalendarLayout from '@/layouts/views/admins/Calendar/inedx.vue'

export const calendarGuildAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: 'calendar',
    name: RouterNameEnum.GUILD_ADMIN_CALENDAR_LAYOUT,
    component: GuildAdminCalendarLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_ADMIN_CALENDAR_MAIN,
        component: () => import('@/views/guilds/admins/calendars/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'detail/:calendarId',
        name: RouterNameEnum.GUILD_ADMIN_CALENDAR_DETAIL,
        component: () => import('@/views/guilds/admins/calendars/Detail/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/new',
        name: RouterNameEnum.GUILD_ADMIN_CALENDAR_CREATE_FORM,
        component: () => import('@/views/guilds/admins/calendars/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/:calendarId',
        name: RouterNameEnum.GUILD_ADMIN_CALENDAR_UPDATE_FORM,
        component: () => import('@/views/guilds/admins/calendars/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
