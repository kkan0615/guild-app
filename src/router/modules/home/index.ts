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
      {
        path: 'guild/list',
        name: RouterNameEnum.HOME_GUILD_LIST,
        component: () => import('@/views/homes/guilds/List/index.vue'),
      },
      {
        path: 'guild/detail/:id',
        name: RouterNameEnum.HOME_GUILD_DETAIL,
        component: () => import('@/views/homes/guilds/Detail/index.vue'),
      },
    ]
  },
]
