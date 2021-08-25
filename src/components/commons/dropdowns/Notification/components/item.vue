<template>
  <div
    class="alert d-flex align-items-center tw-p-2 tw-mb-3"
    :class="{
      [`alert-${type}`]: true,
    }"
    role="alert"
  >
    <!--    <svg-->
    <!--      class="bi flex-shrink-0 me-2"-->
    <!--      width="24"-->
    <!--      height="24"-->
    <!--      role="img"-->
    <!--      aria-label="Success:"-->
    <!--    ><use xlink:href="#check-circle-fill" /></svg>-->
    <span class="material-icons-outlined tw-mr-2">
      info
    </span>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NotificationInfo, NotificationType } from '@/types/systems/notification'

export default defineComponent({
  name: 'NotificationDropdownItem',
  props: {
    notification: {
      type: Object as PropType<NotificationInfo>,
      required: false,
      default: () => {}
    },
    type: {
      type: String as PropType<NotificationType>,
      required: false,
      default: 'success'
    }
  },
  setup: () => {
    const router = useRouter()
    // @TODO: add dayjs library
    const formatted = computed(() => '')

    return {
    }
  }
})
</script>
