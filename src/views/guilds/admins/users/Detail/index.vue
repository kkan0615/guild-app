<template>
  <div>
    detail
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'

export default defineComponent({
  name: 'DetailUserGuildAdmin',
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      const { userId } = route.params
      if (userId) {
        try {
          await store.dispatch(GuildAdminUserActionTypes.LOAD_USER_DETAIL, userId)
        } catch (e) {
          console.error(e)
          router.back()
        }
      } else {
        router.back()
      }
    })

    return {
    }
  }
})
</script>
