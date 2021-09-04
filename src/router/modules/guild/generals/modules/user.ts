import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildUserListLayout from '@/layouts/views/guilds/generals/User/index.vue'

export const userGuildRoutes: Array<RouteRecordRaw> = [
  {
    path: 'users',
    name: RouterNameEnum.GUILD_USER_LAYOUT,
    component: GuildUserListLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_USER_LIST },
    children: [
      {
        path: 'list',
        name: RouterNameEnum.GUILD_USER_LIST,
        component: () => import('@/views/guilds/generals/users/List/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
