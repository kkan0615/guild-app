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
      {
        path: 'signup',
        name: RouterNameEnum.SIGN_UP,
        component: () => import('@/views/auths/Register/index.vue'),
      },
      {
        path: 'logout',
        name: RouterNameEnum.LOGOUT,
        component: () => import('@/views/auths/Logout/index.vue'),
      },
    ]
  },
]

export default authRoutes
