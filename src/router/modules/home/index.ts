import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import HomeLayout from '@/layouts/Home/index.vue'

export const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterNameEnum.HOME_LAYOUT,
    component: HomeLayout,
    children: [
      {
        path: '',
        name: RouterNameEnum.HOME,
        component: () => import('@/views/homes/Home/index.vue'),
      },
      {
        path: 'guild/form',
        name: RouterNameEnum.HOME_GUILD_FORM,
        component: () => import('@/views/homes/guilds/Form/index.vue'),
      },
    ]
  },
]
