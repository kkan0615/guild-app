<template>
  <div
    class="dropdown"
  >
    <div
      role="button"
      type="button"
      class=" tw-cursor-pointer tw-flex tw-justify-center tw-items-center position-relative"
      data-bs-toggle="dropdown"
    >
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ notifications.length }}
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
        Notifications({{ notifications.length }})
        <!--    Make all as read    -->
        <span
          role="button"
          type="button"
          class="tw-text-blue-300 tw-text-xs tw-ml-auto"
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
          v-for="notification in notifications"
          :key="notification.uid"
        >
          {{ notification.content }}
        </notification-dropdown-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CDivider from '@/components/commons/Divider/index.vue'
import NotificationDropdownItem from '@/components/commons/dropdowns/Notification/components/item.vue'
import { Notification } from '@/types/systems/notification'

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
    notifications: {
      type: Array as PropType<Array<Notification>>,
      required: false,
      default: () => []
    }
  },
  setup: () => {

    /* Guild notifications */

    const onClickMakeAllAsReadBtn = () => {
      console.log('onClickMakeAllAsReadBtn')
    }

    return {

    }
  }
})
</script>
