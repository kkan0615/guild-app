import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildAdminLayout from '@/layouts/guilds/Admin/index.vue'
import { informationGuildAdminRoutes } from '@/router/modules/guild/admins/modules/information'
import { userGuildAdminRoutes } from '@/router/modules/guild/admins/modules/user'

export const guildAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: 'admin',
    name: RouterNameEnum.GUILD_ADMIN_LAYOUT,
    component: GuildAdminLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_ADMIN_MAIN_GUILD },
    children: [
      {
        path: 'guild/main',
        name: RouterNameEnum.GUILD_ADMIN_MAIN_GUILD,
        component: () => import('@/views/guilds/admins/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      ...informationGuildAdminRoutes,
      ...userGuildAdminRoutes,
    ]
  },
]
