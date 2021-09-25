import { router } from '@/router/index'
import { store } from '@/store'
import { LocalstorageKeyEnum } from '@/types/systems/localstrage'
import { UserActionTypes } from '@/store/modules/user/actions'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildActionTypes } from '@/store/modules/guilds/generals/info/actions'
import nProgress from 'nprogress'

export default router.beforeEach(async (to, from, next) => {
  nProgress.start()
  const accessToken = localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN)
  if (!store.state.user.id && accessToken) {
    await store.dispatch(UserActionTypes.UPDATE_USER, localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN))
  } else if (store.state.user.id && !accessToken) {
    next({ name: RouterNameEnum.LOGOUT, query: { redirect: from.name as string || '' } })
    nProgress.done()
    return
  }

  try {
    /* If it's guild page */
    if (to.meta.isGuild) {
      const guildId = to.params.guildId
      if (!guildId) {
        nProgress.done()
        // @TODO: Redirect to 404 page
        next({ name: RouterNameEnum.HOME })
      }
      /* If no guild information at store */
      if ((!store.state.guild.guildInfo || !store.state.guild.guildInfo.id) && guildId) {
        await store.dispatch(GuildActionTypes.LOAD_GUILD_INFO, guildId)
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_USER_INFO)
      } else {
        // @TODO: Redirect to 404 page
        nProgress.done()
      }
      if (!store.state.guild.guildUserInfo || !store.state.guild.guildUserInfo.id) {
        await store.dispatch(GuildActionTypes.UPDATE_GUILD_USER_INFO)
      } else {
        // @TODO: Redirect to Home
        nProgress.done()
      }
    }
  } catch (e) {
    console.error(e)
    nProgress.done()
    next({ name: RouterNameEnum.LOGOUT })
    return
  }
  nProgress.done()
  next()
})
