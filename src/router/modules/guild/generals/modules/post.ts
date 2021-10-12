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
      /* Relative with board group */
      {
        path: 'post-board-group/form/new',
        name: RouterNameEnum.GUILD_POST_BOARD_GROUP_CREATE_FORM,
        component: () => import('@/views/guilds/generals/posts/PostBoardGroupForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post-board-group/form/id/:postBoardGroupId',
        name: RouterNameEnum.GUILD_POST_BOARD_GROUP_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/posts/PostBoardGroupForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      /* Relative with board */
      {
        path: 'post-board/id/:postBoardId',
        name: RouterNameEnum.GUILD_POST_BOARD_DETAIL,
        component: () => import('@/views/guilds/generals/posts/PostBoard/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post-board/form/new',
        name: RouterNameEnum.GUILD_POST_BOARD_CREATE_FORM,
        component: () => import('@/views/guilds/generals/posts/PostboardForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post-board/form/id/:postBoardId',
        name: RouterNameEnum.GUILD_POST_BOARD_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/posts/PostboardForm/index.vue'),
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
        component: () => import('@/views/guilds/generals/posts/PostForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
      {
        path: 'post/form/id/:postId',
        name: RouterNameEnum.GUILD_POST_UPDATE_FORM,
        component: () => import('@/views/guilds/generals/posts/PostForm/index.vue'),
        meta: {
          isGuild: true,
        },
      },
    ]
  },
]
