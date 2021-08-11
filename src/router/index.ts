import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import GeneralLayout from '@/layouts/General/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import authRoutes from '@/router/modules/auth'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouterNameEnum.GENERAL_LAYOUT,
    component: GeneralLayout,
    children: [
      {
        path: '',
        name: RouterNameEnum.HOME,
        component: () => import('@/views/Home/index.vue'),
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
