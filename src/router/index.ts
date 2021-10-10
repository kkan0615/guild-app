import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import authRoutes from '@/router/modules/auth'
import { homeRoutes } from '@/router/modules/home'
import { guildRoutes } from '@/router/modules/guild/inedx'

export const routes: Array<RouteRecordRaw> = [
  ...homeRoutes,
  guildRoutes,
  ...authRoutes,
]

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
})
