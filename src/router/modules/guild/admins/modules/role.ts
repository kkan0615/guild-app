import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildAdminRoleLayout from '@/layouts/views/admins/Role/index.vue'

export const roleGuildAdminRoutes: Array<RouteRecordRaw> = [
  {
    path: 'role',
    name: RouterNameEnum.GUILD_ADMIN_ROLE_LAYOUT,
    component: GuildAdminRoleLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN,
        component: () => import('@/views/guilds/admins/roles/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'main/detail/:roleId',
        name: RouterNameEnum.GUILD_ADMIN_ROLE_DETAIL,
        component: () => import('@/views/guilds/admins/roles/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/new',
        name: RouterNameEnum.GUILD_ADMIN_ROLE_CREATE_FORM,
        component: () => import('@/views/guilds/admins/roles/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'form/id/:id',
        name: RouterNameEnum.GUILD_ADMIN_ROLE_UPDATE_FORM,
        component: () => import('@/views/guilds/admins/roles/Form/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
