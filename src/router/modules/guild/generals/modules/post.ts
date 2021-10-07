import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildPostLayout from '@/layouts/views/guilds/generals/Post/index.vue'

export const postGuildRoutes: Array<RouteRecordRaw> = [
  {
    path: 'post',
    name: RouterNameEnum.GUILD_POST_LAYOUT,
    component: GuildPostLayout,
    meta: {
      isGuild: true,
    },
    redirect: { name: RouterNameEnum.GUILD_POST_MAIN },
    children: [
      {
        path: 'main',
        name: RouterNameEnum.GUILD_POST_MAIN,
        component: () => import('@/views/guilds/generals/posts/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'postBoard/id/:postBoardId',
        name: RouterNameEnum.GUILD_POST_BOARD_DETAIL,
        component: () => import('@/views/guilds/generals/posts/PostBoard/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      /* Relative with board */
      {
        path: 'postBoard/form/new',
        name: RouterNameEnum.GUILD_POST_BOARD_CREATE_FORM,
        component: () => import('@/views/guilds/generals/posts/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'postBoard/form/id/:postBoardId',
        name: RouterNameEnum.GUILD_POST_BOARD_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/posts/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      /* Relative with post */
      {
        path: 'post/id/:postId',
        name: RouterNameEnum.GUILD_POST_DETAIL,
        component: () => import('@/views/guilds/generals/posts/PostDetail/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post/form/new',
        name: RouterNameEnum.GUILD_POST_CREATE_FORM,
        component: () => import('@/views/guilds/generals/posts/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post/form/id/:boardId',
        name: RouterNameEnum.GUILD_POST_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/posts/Main/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
