<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16 tw-border-b tw-border-gray-300 tw-px-2 tw-py-0">
    <span
      class="material-icons tw-cursor-pointer"
      @click="onClickHamburgerBtn"
    >
      menu
    </span>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-space-x-4"
    >
      <notification-dropdown
        v-if="guildUserInfo.id"
        :notifications="guildNotifications"
        end
      />
      <!--   if it's logged in   -->
      <guild-user-dropdown
        v-if="guildUserInfo.guildId"
        class="tw-mr-2"
        end
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import NotificationDropdown from '@/components/commons/dropdowns/Notification/index.vue'
import useStore from '@/store'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import { GuildAdminAppActionTypes } from '@/store/modules/guilds/admins/App/actions'
import GuildUserDropdown from '@/components/commons/dropdowns/GuildUser/index.vue'

export default defineComponent({
  name: 'AdminNavbar',
  components: { GuildUserDropdown, NotificationDropdown },
  setup: () => {
    const store = useStore()
    const { guildUserInfo } = useGuildInfoMixin()

    const guildNotifications = computed(() => store.state.guild.userNotificationList)
    const isOpenSidebar = computed(() => store.state.guildAdminApp.isOpenSideBar)

    const onClickHamburgerBtn = async () => {
      if (isOpenSidebar.value) {
        await store.dispatch(GuildAdminAppActionTypes.CLOSE_SIDEBAR)
      } else {
        await store.dispatch(GuildAdminAppActionTypes.OPEN_SIDEBAR)
      }
    }

    return {
      guildUserInfo,
      guildNotifications,
      onClickHamburgerBtn,
    }
  }
})
</script>
