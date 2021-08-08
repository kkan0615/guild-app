import { RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/Auth/index.vue'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: RouterNameEnum.AUTH_LAYOUT,
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: RouterNameEnum.LOGIN,
        component: () => import('@/views/auths/Login/index.vue'),
      },
    ]
  },
]

export default authRoutes
