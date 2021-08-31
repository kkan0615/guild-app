import { router } from '@/router/index'
import { store } from '@/store'
import { LocalstorageKeyEnum } from '@/types/systems/localstrage'
import { UserActionTypes } from '@/store/modules/user/actions'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'

export default router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN)
  if (!store.state.user.uid && accessToken) {
    await store.dispatch(UserActionTypes.UPDATE_USER, localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN))
  } else if (store.state.user.uid && !accessToken) {
    next({ name: RouterNameEnum.LOGOUT, query: { redirect: from.name as string || '' } })
    return
  }

  try {
    /* If it's guild page */
    if (to.meta.isGuild) {
      const guildId = to.params.guildId
      if (!guildId) {
        // @TODO: Redirect to 404 page
        next({ name: RouterNameEnum.HOME })
      }
      /* If no guild information at store */
      if ((!store.state.guild.guildInfo || !store.state.guild.guildInfo.uid) && guildId) {
        await store.dispatch(GuildActionTypes.LOAD_GUILD_INFO, guildId)
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_USER_INFO)
      } else {
        // @TODO: Redirect to 404 page
      }
      if (!store.state.guild.guildUserInfo || !store.state.guild.guildUserInfo.uid) {
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_USER_INFO)
      } else {
        // @TODO: Redirect to Home
      }
    }
  } catch (e) {
    console.error(e)
    next({ name: RouterNameEnum.LOGOUT })
    return
  }
  next()
})
