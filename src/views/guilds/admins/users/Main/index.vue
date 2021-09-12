<template>
  <div
    class="tw-p-2"
  >
    <main-user-guild-admin-table />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import nProgress from 'nprogress'
import MainUserGuildAdminTable from '@/views/guilds/admins/users/Main/components/Table.vue'

export default defineComponent({
  name: 'MainUserGuildAdmin',
  components: { MainUserGuildAdminTable },
  setup: () => {
    const store = useStore()

    const userList = computed(() => store.state.guildAdminUser.userList)

    onMounted(async () => {
      // @TODO: Add loading
      try {
        /* Laod user ilst */
        await store.dispatch(GuildAdminUserActionTypes.LOAD_USER_LIST)
      } catch (e) {
        console.error(e)
      }
    })

    onBeforeUnmount(async () => {
      nProgress.start()
      try {
        /* Reset user list */
        await store.dispatch(GuildAdminUserActionTypes.RESET_USER_LIST)
      } catch (e) {
        console.error(e)
      } finally {
        nProgress.done()
      }
    })

    return {
      userList,
    }
  }
})
</script>
