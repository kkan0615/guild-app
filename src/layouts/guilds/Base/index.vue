<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import useStore from '@/store'
import { GuildActionTypes } from '@/store/modules/guilds/generals/info/actions'

export default defineComponent({
  name: 'GuildBaseLayout',
  setup: () => {
    const store = useStore()

    onBeforeUnmount(async () => {
      /* Clear store data */
      try {
        await store.dispatch(GuildActionTypes.RESET_GUILD_USER_INFO)
      } catch (e) {
        console.error(e)
      }
    })

    return {
    }
  }
})
</script>
