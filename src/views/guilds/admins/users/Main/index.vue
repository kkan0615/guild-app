<template>
  <div
    class="tw-p-2"
  >
    <div
      class="tw-text-lg tw-font-bold tw-mb-2"
    >
      Managers
    </div>
    <div
      class="tw-grid md:tw-grid-cols-6 tw-gap-4"
    >
      <main-user-guild-admin-manager />
    </div>
    <div
      class="tw-my-2"
    >
      <main-user-guild-admin-table />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { GuildAdminUserActionTypes } from '@/store/modules/guilds/admins/User/actions'
import nProgress from 'nprogress'
import MainUserGuildAdminTable from '@/views/guilds/admins/users/Main/components/Table.vue'
import MainUserGuildAdminManager from '@/views/guilds/admins/users/Main/components/Manager.vue'

export default defineComponent({
  name: 'MainUserGuildAdmin',
  components: { MainUserGuildAdminManager, MainUserGuildAdminTable },
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
