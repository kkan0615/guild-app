<template>
  <div
    class="tw-h-full md:tw-p-2"
  >
    <div
      v-if="selectedRole"
    >
      {{ selectedRole }}
    </div>
    test
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminRoleActionTypes } from '@/store/modules/guilds/admins/Role/actions'
import { useRoute, useRouter } from 'vue-router'
import { RouterNameEnum } from '@/types/systems/routers/keys'
import { GuildRole } from '@/types/model/guilds/role'

export default defineComponent({
  name: 'MainRoleGuildAdmin',
  setup: () => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const selectedRole = computed(() => store.state.guildAdminRole.selectedRole)
    const isMainRoute = computed(() => route.name === RouterNameEnum.GUILD_ADMIN_ROLE_MAIN)

    onMounted(async () => {
      if (!isMainRoute.value) {
        try {
          const { id } = route.params
          if (id)
            await store.dispatch(GuildAdminRoleActionTypes.LOAD_SELECTED_ROLE, id)
        } catch (e) {
          console.error(e)
          await router.push({ name: RouterNameEnum.GUILD_ADMIN_ROLE_MAIN })
        }
      }
    })

    onBeforeUnmount(async () => {
      if (!isMainRoute.value) {
        try {
          await store.dispatch(GuildAdminRoleActionTypes.RESET_SELECTED_ROLE)
        } catch (e) {
          console.error(e)
        }
      }
    })

    return {
      selectedRole,
      isMainRoute,
    }
  }
})
</script>
