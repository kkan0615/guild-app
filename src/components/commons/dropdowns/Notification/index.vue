<template>
  <div class="dropdown">
    <div
      role="button"
      type="button"
      class=" tw-cursor-pointer tw-flex tw-justify-center tw-items-center position-relative"
      data-bs-toggle="dropdown"
    >
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        99+
        <span class="visually-hidden">unread messages</span>
      </span>
      <span
        class="material-icons-outlined"
      >
        notifications
      </span>
    </div>
    <div
      class="dropdown-menu tw-h-80 tw-w-96 tw-overflow-y-auto tw-px-2"
      :style="{
        right,
        left,
      }"
    >
      <!-- title -->
      <div
        class="tw-flex tw-items-center"
      >
        Notifications(99+)
        <span
          class="tw-cursor-pointer tw-text-blue-300 tw-text-xs tw-ml-auto"
        >
          Make all as read
        </span>
      </div>
      <c-divider />
      <div
        class="tw-py-1"
      >
        notifications will be here
        <notification-dropdown-item
          v-for="i in 100"
          :key="i"
        >
          An example success alert with an icon {{ i }}
        </notification-dropdown-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/store'
import CDivider from '@/components/commons/Divider/index.vue'
import NotificationDropdownItem from '@/components/commons/dropdowns/Notification/components/item.vue'

export default defineComponent({
  name: 'NotificationDropdown',
  components: { NotificationDropdownItem, CDivider },
  props: {
    isAtGuild: {
      type: Boolean,
      required: false,
      default: false
    },
    right: {
      type: [String, Number],
      required: false,
      default: 'auto',
    },
    left: {
      type: [String, Number],
      required: false,
      default: 0,
    },
  },
  setup: () => {
    const store = useStore()

    /* Guild notifications */
    const guildNotifications = computed(() => store.state.guild.userNotificationList)

    return {
      guildNotifications
    }
  }
})
</script>
