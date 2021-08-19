<template>
  <div
    v-if="guildInfo"
  >
    {{ guildInfo.name }}
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'
import { HomeActionTypes } from '@/store/modules/home/actions'

export default defineComponent({
  name: 'HomeGuildDetail',
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const guildInfo = computed(() => store.state.home.guildInfo)

    onMounted(async () => {
      const guildId = route.params.id
      /* If guildId ex */
      if (guildId) {
        await store.dispatch(HomeActionTypes.LOAD_GUILD_INFO, guildId)
      } else {
        // @TODO: Redirect 404 page, but now is just send back
        router.back()
      }
    })

    return {
      guildInfo
    }
  }
})
</script>
