import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GeneralLayout from '@/layouts/guilds/General/index.vue'

export const guildGeneralRoutes: Array<RouteRecordRaw> = [
  {
    path: 'general',
    name: RouterNameEnum.GENERAL_LAYOUT,
    component: GeneralLayout,
    meta: {
      isGuild: true,
    },
    children: [
      {
        path: '',
        name: RouterNameEnum.GUILD_HOME,
        component: () => import('@/views/guilds/Home/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'playground',
        name: 'Playground',
        component: () => import('@/views/Playground/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
