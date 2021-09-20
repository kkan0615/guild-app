import { RouteRecordRaw } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import GuildBaseLayout from '@/layouts/guilds/Base/index.vue'
import { guildGeneralRoutes } from '@/router/modules/guild/generals'
import { guildAdminRoutes } from '@/router/modules/guild/admins'
import { store } from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'

export const guildRoutes: RouteRecordRaw = {
  path: '/guild-app/:guildId',
  name: RouterNameEnum.GUILD_BASE_LAYOUT,
  component: GuildBaseLayout,
  meta: {
    isGuild: true,
  },
  beforeEnter: (async (to, from, next) => {
    const guildId = to.params.guildId
    if (guildId && (!store.state.guild.guildInfo || !store.state.guild.guildInfo.id)) {
      await store.dispatch(GuildActionTypes.LOAD_GUILD_INFO, guildId)
    }
    next()
  }),
  // children: [
  //   ...guildAdminRoutes,
  //   ...guildGeneralRoutes,
  // ]
  children: [
    ...guildAdminRoutes,
    ...guildGeneralRoutes,
  ]
}
