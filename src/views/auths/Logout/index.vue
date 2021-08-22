<template>
  <div>
    Logout
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useStore from '@/store'
import { UserActionTypes } from '@/store/modules/user/actions'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'

export default defineComponent({
  name: 'Logout',
  setup: () => {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    onMounted(async () => {
      /* Process logout */
      await store.dispatch(UserActionTypes.LOGOUT)
      /* Back to home */
      await router.push({ name: RouterNameEnum.HOME, query: { ...route.query } })
    })
  }
})
</script>
