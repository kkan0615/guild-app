import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeLayout from '@/layouts/Home/index.vue'
import GeneralLayout from '@/layouts/General/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import authRoutes from '@/router/modules/auth'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterNameEnum.HOME_LAYOUT,
    component: HomeLayout,
    children: [
      {
        path: '',
        name: RouterNameEnum.HOME,
        component: () => import('@/views/Home/index.vue'),
      },
    ]
  },
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
  ...authRoutes,
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes
})
