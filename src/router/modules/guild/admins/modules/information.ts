import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildAdminInformationLayout from '@/layouts/views/admins/Information/index.vue'

export const informationGuildAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: 'information',
    name: RouterNameEnum.GUILD_ADMIN_INFORMATION_LAYOUT,
    component: GuildAdminInformationLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_ADMIN_INFORMATION_MAIN,
        component: () => import('@/views/guilds/admins/information/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'question',
        name: RouterNameEnum.GUILD_ADMIN_INFORMATION_QUESTION,
        component: () => import('@/views/guilds/admins/information/Question/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'importance',
        name: RouterNameEnum.GUILD_ADMIN_INFORMATION_IMPORTANCE,
        component: () => import('@/views/guilds/admins/information/Importance/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
