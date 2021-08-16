import useStore from '@/store'
import { computed } from 'vue'

export default function () {
  const store = useStore()

  const loggedInUser = computed(() => store.state.user)
  const isLoggedIn = computed(() => store.getters.isLoggedIn)

  return {
    loggedInUser,
    isLoggedIn,
  }
}
