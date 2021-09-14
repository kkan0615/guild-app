<template>
  <div
    class="dropdown"
  >
    <div
      class="tw-cursor-pointer tw-flex tw-justify-center tw-items-center position-relative"
      data-bs-toggle="dropdown"
    >
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ notifications.length }}
        <span class="visually-hidden">unread messages</span>
      </span>
      <c-material-icon
        class="tw-cursor-pointer"
        type="outlined"
      >
        notifications
      </c-material-icon>
    </div>
    <div
      class="dropdown-menu tw-h-80 tw-w-96 tw-overflow-y-auto tw-px-2"
      :class="{
        'dropdown-menu-end': end,
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
        <div
          v-if="notifications"
        >
          <notification-dropdown-item
            v-for="notification in notifications"
            :key="notification.uid"
          >
            {{ notification.content }}
          </notification-dropdown-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CDivider from '@/components/commons/Divider/index.vue'
import NotificationDropdownItem from '@/components/commons/dropdowns/Notification/components/item.vue'
import { Notification } from '@/types/systems/notification'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

export default defineComponent({
  name: 'NotificationDropdown',
  components: { CMaterialIcon, NotificationDropdownItem, CDivider },
  props: {
    isAtGuild: {
      type: Boolean,
      required: false,
      default: false
    },
    end: {
      type: Boolean,
      required: false,
      default: false,
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
