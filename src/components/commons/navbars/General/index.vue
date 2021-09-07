<template>
  <nav class="navbar navbar-expand-lg navbar-light tw-h-16 tw-border-b tw-border-gray-300 tw-px-2 tw-py-0">
    <span
      class="material-icons tw-cursor-pointer"
      @click="onClickHamburgerBtn"
    >
      menu
    </span>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-gap-x-4"
    >
      <notification-dropdown
        v-if="guildUserInfo.uid"
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
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import GuildUserDropdown from '@/components/commons/dropdowns/GuildUser/index.vue'
import NotificationDropdown from '@/components/commons/dropdowns/Notification/index.vue'
import useStore from '@/store'
import useGuildInfoMixin from '@/mixins/useGuildInfoMixin'
import { GuildActionTypes } from '@/store/modules/guilds/info/actions'

export default defineComponent({
  name: 'GeneralNavbar',
  components: { NotificationDropdown, GuildUserDropdown },
  setup: () => {
    const store = useStore()
    const { guildInfo, guildUserInfo } = useGuildInfoMixin()

    const guildNotifications = computed(() => store.state.guild.userNotificationList)
    const isOpensidebar = computed(() => store.state.guild.isOpenSideBar)

    const onClickHamburgerBtn = async () => {
      if (isOpensidebar.value) {
        await store.dispatch(GuildActionTypes.CLOSE_SIDEBAR)
      } else {
        await store.dispatch(GuildActionTypes.OPEN_SIDEBAR)
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
