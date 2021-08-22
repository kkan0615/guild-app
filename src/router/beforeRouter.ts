import { router } from '@/router/index'
import { store } from '@/store'
import { LocalstorageKeyEnum } from '@/types/systems/localstrage'
import { UserActionTypes } from '@/store/modules/user/actions'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default router.beforeEach(async (to, from, next) => {
  if (!store.state.user.uid && localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN)) {
    await store.dispatch(UserActionTypes.UPDATE_USER, localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN))
  } else if (store.state.user.uid && !localStorage.getItem(LocalstorageKeyEnum.ACCESS_TOKEN)) {
    next({ name: RouterNameEnum.LOGOUT, query: { redirect: from.name as string || '' } })
    return
  }
  next()
})
