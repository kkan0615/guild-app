import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildAdminUserLayout from '@/layouts/views/admins/User/index.vue'

export const userGuildAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: 'user',
    name: RouterNameEnum.GUILD_ADMIN_USER_LAYOUT,
    component: GuildAdminUserLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_ADMIN_USER_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_ADMIN_USER_MAIN,
        component: () => import('@/views/guilds/admins/users/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'join',
        name: RouterNameEnum.GUILD_ADMIN_USER_JOINS,
        component: () => import('@/views/guilds/admins/users/Join/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
