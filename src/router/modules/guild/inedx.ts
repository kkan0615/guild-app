import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GeneralLayout from '@/layouts/General/index.vue'

export const guildRoutes: Array<RouteRecordRaw> = [
  {
    path: '/guild',
    name: RouterNameEnum.GENERAL_LAYOUT,
    component: GeneralLayout,
    children: [
      {
        path: '',
        name: RouterNameEnum.GUILD_HOME,
        component: () => import('@/views/guilds/Home/index.vue'),
      },
      {
        path: 'playground',
        name: 'Playground',
        component: () => import('@/views/Playground/index.vue'),
      },
    ]
  },
]
