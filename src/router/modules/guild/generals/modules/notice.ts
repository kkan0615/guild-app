import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildNoticeLayout from '@/layouts/views/guilds/generals/Notice/index.vue'

export const noticeGuildRoutes: Array<RouteRecordRaw> = [
  {
    path: 'notice',
    name: RouterNameEnum.GUILD_NOTICE_LAYOUT,
    component: GuildNoticeLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_NOTICE_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_NOTICE_MAIN,
        component: () => import('@/views/guilds/generals/notices/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/new',
        name: RouterNameEnum.GUILD_NOTICE_CREATE_FORM,
        component: () => import('@/views/guilds/generals/notices/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/id/:id',
        name: RouterNameEnum.GUILD_NOTICE_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/notices/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
