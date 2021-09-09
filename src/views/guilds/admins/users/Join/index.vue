<template>
  <div>
    joinForms
    <div>
      {{ joinForms }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'

export default defineComponent({
  name: 'JoinUserGuildAdmin',
  setup: () => {
    const store = useStore()

    const fullLoading = ref(false)

    const joinForms = computed(() => store.state.guildAdminUser.joinForms)

    // @TODO: ADD loading
    onMounted(async () => {
      fullLoading.value = true
      try {
        await store.dispatch(GuildAdminUserActionTypes.LOAD_GUILD_JOIN_FORMS)
      } catch (e) {
        console.error(e)
      } finally {
        fullLoading.value = false
      }
    })

    onBeforeUnmount(async () => {
      await store.dispatch(GuildAdminUserActionTypes.RESET_GUILD_JOIN_FORMS)
    })

    return {
      joinForms
    }
  }
})
</script>
