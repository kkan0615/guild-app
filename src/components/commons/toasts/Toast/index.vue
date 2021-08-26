<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <img
        class="rounded me-2"
        alt="..."
      >
      <strong
        v-if="toast.title"
        class="me-auto"
      >
        {{ toast.title }}
      </strong>
      <small class="text-muted">just now</small>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      />
    </div>
    <div class="toast-body">
      {{ toast.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue'
import { Toast } from '@/types/systems/toast'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'BToast',
  props: {
    toast: {
      type: Object as PropType<Toast>,
      required: false,
      default: () => {}
    }
  },
  setup: (props) => {
    const calendarTime = computed(() => dayjs(props.toast.createdAt).fromNow())
    return {
    }
  }
})
</script>
