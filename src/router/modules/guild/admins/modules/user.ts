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
      {
        path: 'black-list',
        name: RouterNameEnum.GUILD_ADMIN_USER_BLACK_LIST,
        component: () => import('@/views/guilds/admins/users/BlackList/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
  {
    path: 'user/detail/:userId',
    name: RouterNameEnum.GUILD_ADMIN_USER_DETAIL,
    component: () => import('@/views/guilds/admins/users/Detail/index.vue'),
    meta: {
      isGuild: true,
    },
  },
  {
    path: 'user/edit/:userId',
    name: RouterNameEnum.GUILD_ADMIN_USER_EDIT,
    component: () => import('@/views/guilds/admins/users/Edit/index.vue'),
    meta: {
      isGuild: true,
    },
  },
]
